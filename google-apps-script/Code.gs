/**
 * NplusOne landing page enquiry webhook
 *
 * Setup:
 * 1. Create a Google Sheet for enquiries.
 * 2. Copy the spreadsheet ID from the Sheet URL.
 * 3. In Apps Script, paste this file into Code.gs.
 * 4. Replace SHEET_ID below with your spreadsheet ID.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me.
 * 7. Who has access: Anyone.
 * 8. Copy the web app URL into .env as VITE_GOOGLE_SCRIPT_URL.
 *
 * CORS note:
 * Apps Script ContentService does not expose custom response headers in the
 * same way as a typical server. The website sends a simple text/plain POST to
 * avoid a browser preflight request.
 */

const SHEET_ID = "1DqRWD1_My9OJC0XaquehVDqtLJS6bezHMotp4AwiscM";
const SHEET_NAME = "Enquiries";

const HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Background",
  "Build Type",
  "Timeline",
  "Message",
  "Source",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = normalizePayload(parsePayload(e));
    validatePayload(data);

    const sheet = getSheet();
    ensureHeaders(sheet);

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.background,
      data.buildTypes.join(", "),
      data.timeline,
      data.message,
      data.source,
    ]);

    return jsonResponse({
      success: true,
      message: "Enquiry saved.",
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error && error.message ? error.message : "Unknown error.",
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "NplusOne enquiry webhook is running.",
  });
}

function parsePayload(e) {
  if (!e) return {};

  const contentType = (e.postData && e.postData.type) || "";
  const contents = (e.postData && e.postData.contents) || "";

  if (contents) {
    try {
      return JSON.parse(contents);
    } catch (jsonError) {
      if (contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
        return e.parameter || {};
      }
      throw new Error("Request body must be valid JSON or form-encoded data.");
    }
  }

  return e.parameter || {};
}

function normalizePayload(raw) {
  const buildTypes = Array.isArray(raw.buildTypes)
    ? raw.buildTypes
    : String(raw.buildTypes || raw.buildType || "")
        .split(",")
        .map(function (item) {
          return item.trim();
        })
        .filter(Boolean);

  return {
    name: clean(raw.name),
    email: clean(raw.email),
    phone: clean(raw.phone),
    background: clean(raw.background),
    buildTypes: buildTypes,
    timeline: clean(raw.timeline),
    message: clean(raw.message),
    source: clean(raw.source) || "NplusOne landing page",
  };
}

function validatePayload(data) {
  if (!data.name) throw new Error("Name is required.");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("A valid email is required.");
  }
  if (!data.background) throw new Error("Background is required.");
  if (!data.buildTypes.length) throw new Error("Build type is required.");
  if (!data.timeline) throw new Error("Timeline is required.");
}

function getSheet() {
  if (!SHEET_ID || SHEET_ID === "PASTE_YOUR_GOOGLE_SHEET_ID_HERE") {
    throw new Error("Set SHEET_ID in Code.gs before deploying.");
  }

  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every(function (header, index) {
    return firstRow[index] === header;
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function clean(value) {
  return String(value || "").trim();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
