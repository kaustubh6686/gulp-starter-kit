config = {};

// Base Folder
config.base = ('./app/');
config.build = ('./build/');

// HTML Files
config.html = {
  src: config.base + '*.(html|php)', 
}

// JS Files - source, destination and build path
config.js = {
  src: config.base + 'scripts/',
  dest: config.base + 'js/',
  build: '',
};

// JS Files - source, destination and build path
config.css = {
  src: config.base + 'styles/',
  dest: config.base + 'css/',
  build: '',
};


module.exports.config = config;