const P_TYPE = '^(\\w+)'; // Начало: слово (feat, fix...)
const P_SCOPE = '(?:\\(([^)]+)\\))?'; // Опционально: (scope)
const P_SEP = ': '; // Разделитель: двоеточие и пробел
const P_SUBJECT = '(.+)'; // Тема: любой текст
const P_TICKET = ' #(\\d+)$'; // Тикет: пробел, решетка, цифры, конец строки

const HEADER_PATTERN_STR = P_TYPE + P_SCOPE + P_SEP + P_SUBJECT + P_TICKET;

module.exports = {
  P_TYPE,
  P_SCOPE,
  P_SEP,
  P_SUBJECT,
  P_TICKET,
  HEADER_PATTERN_STR,
  ticketRegex: new RegExp(P_TICKET),
  fullHeaderRegex: new RegExp(HEADER_PATTERN_STR),
};
