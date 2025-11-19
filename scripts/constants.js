const P_TYPE = '^(\\w+)'; // Начало: слово (feat, fix...)
const P_SCOPE = '(?:\\(([^)]+)\\))?'; // Опционально: (scope)
const P_SEP = ': '; // Разделитель: двоеточие и пробел
const P_SUBJECT = '(.+)'; // Тема: любой текст
const P_TICKET = ' #(\\d+)$'; // Тикет: пробел, решетка, цифры, конец строки

const HEADER_PATTERN_STR = P_TYPE + P_SCOPE + P_SEP + P_SUBJECT + P_TICKET;

// Паттерн для мержей (стандартный git output)
// Охватывает: "Merge branch...", "Merge pull request...", "Merge remote-tracking branch..."
const MERGE_PATTERN_STR = '^Merge .*';

module.exports = {
  ticketRegex: new RegExp(P_TICKET),
  fullHeaderRegex: new RegExp(HEADER_PATTERN_STR),
  sepRegex: new RegExp(P_SEP),
  mergeRegex: new RegExp(MERGE_PATTERN_STR),
};
