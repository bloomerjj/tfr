ABAL18CDNY5878 - Tymlos First Responder Microsite
================================


# Setup

1. Please make sure you have yarn installed. Follow the guide here if needed: https://yarnpkg.com/lang/en/docs/install
2. Run the following command on the root of the project, where the package.json file is located: yarn install
3. Wait until all the dependencies have been downloaded
4. Make sure you have grunt installed as part of the dependencies dowloaded on the previous steps or install it manually: https://gruntjs.com/installing-grunt
5. Run the following command to generate the different packages for both development and production:
   - **Development package:** grunt dev
   - **Production package:** grunt prod
6. After that a new folder called "dist" should have been created on the root of the folder, you can package that and deploy to the corresponding environment.



# Website Grunt Build Workflow

This is the default Grunt build for any project intended for the web.

NOTE: this version does not use Ruby or Vagrant


## Markup

### Data

* Yaml files including meta data for site.  Also sometimes used for pulling info from the Grunt build into the Jade file.
* There is a really horrible website with documentation for Yaml here: http://yaml.org/

### Layouts

* Basic page layouts that can be inherited by an individual page in Jade.  Usually includes any page partials, along with the html head.

### Mixins

* Reusable snippets of Jade that can be included on a page to reduce repeated code for similar elements.  'all.jade' is included by default, and generally any new mixins should go there.  Other files can be added for elements using mixins if necessary (usually when there's a lot more code associated with it or is only used in certain places).

### Pages

* The individual pages of the website.  This folder can be broken into subfolders if necessary to compliment logic of subnavs (at your discretion).  These are the only files that actually compile into their own html files.  Don't forget to extend a layout.

### Partials

* These are bigger chunks of code that are repeated on most or all pages.  Headers, footers, ISI stuff, etc.  These are usually included in the layout since they are almost always global.


## Scripts

### App

* **Controllers**, **directives**, **filters**, **services**: check out angular documentation for these.  
* **Vendor**: where we put third party angular scripts.
* app.js: where all angular stuff is included - this file is what's included in the base layout

### Vendor

* All JS libraries from third parties.


## Styles

### Base

* Global styles, resets, fonts, etc.

### Components

* Elements of design and functionality that are repeated but are similar enough for styles to be globalized.
* Styles for Jade mixins should go here
* Usually each gets its own file and are included in __components.scss

### Helpers

* Global Sass code that helps make code more DRY.

#### Mixins

* A set of related scss attributes that are being repeated frequently should be turned into a mixin.
* This will probably the most important file here to utilize.

### Layouts

* These are the styles for large elements of design and functionality.
* These are analogous to the partials in Jade and the files should correspond.

### Pages

* Styles specific to individual pages.
* Each Jade/HTML page should have its own file.
* All the scss in each file should be wrapped in a unique class for that page.

### Vendor

* Third party Sass.

### Views

* I don't think we actually use this for anything.

## Shame

* _shame.scss: this is used for hacky fixes/overrides that don't really have a place elsewhere.
* This file falls below all other Sass files so anything can be overridden here.
* If you put any code here, include a comment explaining it and why it couldn't be done elsewhere.
