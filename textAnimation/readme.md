npm i gsap@2.1.3
npm install --save-dev webpack webpack-cli
npm install --save-dev babel-loader  @babel/core @babel/cli @babel/preset-env

npx babel ActivitiesAnimationComponent.js --out-dir lib --presets=@babel/preset-env

npx webpack