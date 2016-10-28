Styling should preferably be done by using Kambi classes where ever thats possible to keep the style consistent with the rest of the client.

Kambi client will load `widgets.css` which will have most of the classes needed to style a widget, matching the operator theme.
> Note: Kambi uses [BEM methodology](http://getbem.com/)

### Basic CSS classes

 - `.KambiWidget-font` Default font that should be used.
 - `.KambiWidget-primary-color` Default color for emphasized text 
 - `.KambiWidget-primary-background-color` Default background color for emphasis.
 - `.KambiWidget-primary-text-color` Default color for emphasized text inside emphasized background
 - `.KambiWidget-card-background-color` Default backrgound color for cards 
    - `.KambiWidget-card-background-color--hoverable:hover` 
    - `.KambiWidget-card-background-color--clickable:active` 
 - `.KambiWidget-card-text-color`  Default font color for text inside cards
 - `.KambiWidget-card-support-text-color`  Alternative \(secondary\) font color for text inside cards
 - `.KambiWidget-header ` Default styling \(background color, text color and font\) used for headers
 
> Please note that `coreLibrary` will add `.KambiWidget-card-text-color`, `.KambiWidget-card-background-color`, `.KambiWidget-font` to the `<HTML>` tag

Here is a screenshot showing various classes in use:

![Image of kambi css in use](kambicss.jpg)