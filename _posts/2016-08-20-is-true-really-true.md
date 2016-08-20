---
layout: post
title: Is true really true?
tags : [r-tip]
---
An often forgotten R-function while developing: `isTRUE()` and it's brother `isFALSE()`.
Have you found yourself in the situation that you had to write

{% highlight r %}
if (!is.null(foo$bar) && foo$bar == "awesome") {}
{% endhighlight %}
Much shorter is the following:

{% highlight r %}
if (isTRUE(foo$bar == "awesome")) {}
{% endhighlight %}
<!--more-->
This additional code is often necessary if `foo` is a list and we are not certain that `bar` is an element of it.
So first we have to check, whether `bar` is not `NULL`.
Otherwise you get the following error

{% highlight r %}
foo = list()
if (foo$bar == "awesome") cat("it works!")
{% endhighlight %}



{% highlight text %}
## Error in if (foo$bar == "awesome") cat("it works!"): argument is of length zero
{% endhighlight %}
If you didn't now before `&&` and `||` stop the evaluation as soon as possible.
So `a && b && c` does not check `b` and `c` if `a` is already `FALSE.
Vice versa with `a || b || c`.
If `a` is `FALSE` and `b` is `TRUE` there is no more necessity to look at `c` because the whole expression is already `TRUE`.

But in R we also have the single `&` and `|`!
These are meant to compare logical vectors as in

{% highlight r %}
a = runif(10) > 0.5
b = runif(10) > 0.5
a|b
{% endhighlight %}



{% highlight text %}
##  [1]  TRUE  TRUE  TRUE FALSE  TRUE FALSE  TRUE  TRUE FALSE  TRUE
{% endhighlight %}

