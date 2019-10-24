import { fromJS } from 'immutable'
import nanoid from 'nanoid'

const isMobileDevice = () =>
  (typeof window.orientation !== "undefined") ||
  (navigator.userAgent.indexOf('IEMobile') !== -1)

const getTodayDate = () => new Date().toISOString().split('T')[0]

export const blankPost = fromJS({
  published: false,
  likes: 0,
  comments: 0,
  reposts: 0,
  date: '',
  time: '',
  text: '',
  targets: []
})

export const errors = fromJS({
  editor: {
    datetime: null,
    targets: null
  }
})

export const initialState = fromJS({
  mobile: isMobileDevice(),
  editorOpened: false,
  asideOpened: false,
  scrollPosition: 0,
  preview: null,  // post id
  today: getTodayDate(),
  posts: [{
    id: nanoid(),
    published: false,
    date: getTodayDate(),
    time: '00:00',
    text: 'Hello',
    targets: ['instagram', 'googleplus', 'twitter', 'facebook', 'youtube'],
    likes: 52,
    comments: 16,
    reposts: 3,
    views: 243
  }, {
    id: nanoid(),
    published: false,
    date: getTodayDate(),
    time: '12:00',
    text: 'Hello',
    targets: ['instagram'],
    likes: 52,
    comments: 16,
    reposts: 3,
    views: 501
  }, {
    id: nanoid(),
    published: false,
    date: getTodayDate(),
    time: '22:00',
    text: 'Hello',
    targets: ['instagram'],
    likes: 52,
    comments: 16,
    reposts: 3,
    views: 496
  },
  {
    id: nanoid(),
    published: false,
    date: '2019-04-04',
    time: '14:00',
    text: 'Hello',
    targets: ['instagram'],
    likes: 52,
    comments: 16,
    reposts: 3,
    views: 496
  }],
  newPost: blankPost,
  errors
})
