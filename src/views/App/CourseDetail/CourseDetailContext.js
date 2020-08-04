const { createContext } = require('react');

const CourseDetailContext = createContext({
  courseData: null,
  playingLesson: null,
  selectLesson: () => {},
});

export default CourseDetailContext;
