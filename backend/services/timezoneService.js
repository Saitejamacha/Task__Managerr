const moment = require("moment-timezone");

function convertToUserTimezone(dateTime, userTimezone) {
  if (!dateTime || !userTimezone) return null;
  try {
    return moment(dateTime).tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");
  } catch (error) {
    console.error("Timezone conversion error:", error);
    return null;
  }
}

function formatForDisplay(task, userTimezone = "UTC") {
  if (!task || typeof task !== "object") {
    console.error("Invalid task object:", task);
    return null;
  }

  const formattedTask = { ...task };

  try {
    if (task.created_at) {
      formattedTask.created_at = moment(task.created_at)
        .tz(userTimezone)
        .format("LLL");
    }

    // Format updated_at
    if (task.updated_at) {
      formattedTask.updated_at = moment(task.updated_at)
        .tz(userTimezone)
        .format("LLL");
    }

    // Format due_date
    if (task.due_date) {
      formattedTask.due_date = moment(task.due_date)
        .tz(userTimezone)
        .format("LLL");
      formattedTask.due_date_raw = moment(task.due_date)
        .tz(userTimezone)
        .format("YYYY-MM-DDTHH:mm");
    }
  } catch (error) {
    console.error("Date formatting error:", error);
    // Return the unformatted task if formatting fails
    return task;
  }

  return formattedTask;
}

module.exports = {
  convertToUserTimezone,
  formatForDisplay,
};
