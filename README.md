# TODO list with simple pubsub, asyncronous server updates and no frameworks

![](https://img.shields.io/badge/licence-free-green.svg) ![](https://img.shields.io/badge/frameworks-none-green.svg)

[#noframeworks](https://dev.to/gypsydave5/why-you-shouldnt-use-a-web-framework-3g24), just pure JavaScript ES6.

It uses built-in ES6 webcomponents and the pubsub pattern to allow each component to subscribe and/or publish to the datastore. In 300 lines of pure Javascript.

![](demo.gif)

## Install

This was built on
* php 7.x
* chromium
* Ubuntu 18.04

To install
* download and unzip to a folder of your choice
* start with `php -S localhost:4567`
* point your browser at `localhost:4567`


## how it works
Objects that have something to say publish a string of NewInfo and an object of data:
```
    let person = {'name':'bill, 'age': 34};
    this.pubsub.publish('NewPerson', person);
    this.pubsub.publish('Message', {"component": "app-addperson", "text": "adding " + person.name});
```
Objects that are interested in those news items subscribe to 'NewPerson'/'Message'/'SomeEvent' etc, state what info they want, pass parameters if needed (eg id) and give the callback function they want to be fired:
```
    this.pubsub.subscribe('NewPerson', 'getChosenPeople', null, this.renderData);
```
I could have wrapped all requests in an object, so instead of 
<pre>
    this.pubsub.subscribe(<b>'NewPerson'</b>, 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe(<b>'ChangePerson'</b>, 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe(<b>'DeletePerson'</b>, 'getChosenPeople', null, this.renderData);
</pre>
we would have
<pre>
this.pubsub.subscribe(<b>{'NewPerson','ChangePerson','DeletePerson'}</b>, 'getChosenPeople', null, this.renderData);
</pre>
but then it would be more tricky to assign specific requests/callbacks to each NewInfo.

## notes
I used [James Johnson's](http://jelly.codes/articles/javascript-es6-autobind-class/) code to autobind 'this' for methods instead of having to do it in every class. So originally I had something like:
<pre>class appAddtask extends HTMLElement {}</pre>
I now have:
<pre>class appAddtask extends RootElement {}</pre>
and RootElement extends HTMLElement.

It needed a couple of changes:
* [currCls.\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) is deprecated in favor of [Object.getPrototypeOf(currCls)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
* Object.getPrototypeOf(currCls) needs to be checked for null/undefined, hence the check on line 16 in app-rootelement.js

The [Vaadin](https://www.youtube.com/channel/UCsGakFIbOsj-fgPFLf1QlQA) clip that showed me the way is [here](https://www.youtube.com/watch?v=mTNdTcwK3MM&t=213s)

Use as you like, ask questions if stuck, and stars are nice (top right)...