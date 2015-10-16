# Standard Build Template

[_build](https://github.com/cjohndesign/_build) is a precomposed filesystem and workflow to build web apps. Primarily, it is for web designers new to [Sass](http://sass-lang.com/) or struggleing with the processing. It uses [Grunt](http://gruntjs.com/) to generate minified css and js files and has [Bootstrap](http://getbootstrap.com/) already installed. 

## Install Instructions

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| node.js 0.12.x  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| grunt-cli 	  | `grunt -v`   | `npm install -g grunt-cli` |
| rvm			  | `rvm -v`   	 | `gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3` |
| 				  | 		   	 | `\curl -sSL https://get.rvm.io | bash -s stable` |
| compass		  | `compass -v` | `gem update --system` |
| 				  | 		   	 | `gem install compass` |

> Note: Text in the above table notated like `this` are terminal commands. Install node.js from the download, then run the commands under "How to install" in the terminal, in order. 

## Recommended Software

| Software																| Description 					   |
| --------------------------------------------------------------------- | -------------------------------- |
| [Sublime Text](http://www.sublimetext.com/) 							| Free Text Editor			       |
| [Emmet for Sublime Text](https://github.com/sergeche/emmet-sublime)	| Makes writing html awesome again |
| [Mamp](https://www.mamp.info/)				  						| Hosts website locally

Now, once you have Mamp up and running and "Hello World!" is loading in the browser, navigate to the _build-master folder in the terminal and enter `grunt`. Grunt is now monitoring that folder for changes. If it sees a change, the results reload live to the browser. This is a streamline process to begin hard-coding an contemporary website. 

## Share:
[github.com/cjohndesign/_build](https://github.com/cjohndesign/_build)

I hope you found this helpful. If you have a question or find a bug, email me at: cjohndesign@gmail.com

> (MIT License)