// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//HTML 파일을 생성하고 번들 파일을 자동으로 포함시킵니다.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//이전에 생성된 번들 파일을 자동으로 삭제합니다.
module.exports = {
//   mode: 'development',  // 또는 'production'development
  mode: 'production',  // 또는 'production'development
  // 엔트리 포인트: 웹팩이 번들링을 시작하는 파일
  entry: './ActivitiesAnimationComponent.js',
  // 출력 설정: 번들링된 파일을 저장할 위치와 파일명
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 모듈 처리 방식 설정
  module: {
    rules: [
      // JavaScript 파일 처리 (Babel 등 사용)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // CSS 파일 처리 (style-loader, css-loader 등 사용)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './index.html'
	}),
	new CleanWebpackPlugin()
  ]
};
/*
entry: 웹팩이 번들링을 시작하는 파일을 지정합니다.
output: 번들링된 파일을 저장할 위치와 파일명을 설정합니다.
module.rules: 다양한 종류의 파일을 처리하기 위한 규칙을 정의합니다.
test: 어떤 종류의 파일을 처리할지 정규 표현식으로 지정합니다.
use: 해당 파일을 처리하기 위해 사용할 로더를 배열로 지정합니다. 로더는 오른쪽에서 왼쪽 순으로 적용됩니다.
*/