
exports.dataSceens = {
  eventByDate: [
    {
      path: 'message-by-date',
      title: 'Message by date',
      description: 'Send a message once on a specific date, \noption to send to several contacts.',
      type: 'messageByDate',
      data: [
        'date',
        'dayInMonth',
        'dayInWeek',
      ],
    },
    {
      path: 'every-month-by-day',
      title: 'Every month by day',
      description: 'Send a message once on a specific date, \noption by contact or group or all.',
      type: '',
      data: [
        'date',
        'dayInMonth',
        'dayInWeek',
      ],
    },
  ],
  replyMessagesReceived: [
    {
      path: 'message-by-text-received',
      title: 'Message by text received',
      description: 'Reply a message by text received, \noption by contact or group or all.',
      type: '',
      data: [
        'date',
        'dayInMonth',
        'dayInWeek',
      ],
    },
  ],
}