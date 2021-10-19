export enum Exception {
  UserAlreadyExists = 'Пользователь уже существует',
  UserNotFound = 'Пользователь не найден',
  SendingEmailFailed = 'Не удалось отправить письмо',
  AuthorizationFailed = 'Не удалось авторизоваться',
  NoAccess = 'Нет доступа',
  GroupAlreadyExists = 'Группа с таким номером уже существует',
  GroupNotFound = 'Группа не найдена',
  PatientNotFound = 'Пациент не найден',
  IncorrectIndicatorsOptions = 'Некорректные параметры показателя',
  IndicatorNotFound = 'Показатель не найден',
  IndicatorsListEmpty = 'Список показателей пуст',
  AnalysisNotFound = 'Анализ не найден'
}