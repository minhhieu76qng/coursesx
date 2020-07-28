const { createContext } = require('react');

const CourseDetailContext = createContext({
  courseData: null,
  playingLesson: null,
});

export default CourseDetailContext;
