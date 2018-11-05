### OBJECTIVE
This integration is an example of how the KM SDK can be implemented as a floating widget. It aims to ease the development when a widget style is desired and inspire integrators to create other SDK implementations.

This integration includes **src/js** and **src/styles** which have all the front-end development and its styles and a small *index.html* which exemplifies how to do the integration on a website.

### FUNCTIONALITIES
This example includes some of the KM functionalities, but not all of them. Please feel free to extend this code with any new features you want to include. Currently, the features provided by this application are:
* Semantic search
* Autocompleter
* Popular contents
* Categories
* Content ratings
* Decision trees

### INSTALLATION
It's pretty simple to get this UI working.

1. Add the JS and CSS files on your website CMS.
2. Include the following scripts in the head of all pages you want to have the widget
```html
<script src="<path to the file>/sdk-widget.js"></script>
<link rel="stylesheet" type="text/css" href="<path to the file>/sdk-widget.css">
```
3. Add the following script in all pages you want to have the widget. It need to indicate:
* SDK version
* Domain key
* API key
* SDK Configuration
```html
<script type="text/javascript">
    createInbentaKmSDKWidget(
        "<SDK version>",
        "<Domain key>",
        "<API key>",
        {} // SDK configuration
    );
</script>
```

### DEPENDENCIES
This implementation have no dependencies except for the KM SDK version 1.19.0 or higher.
