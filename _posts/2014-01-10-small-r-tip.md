---
layout: post
title: Plot correctly with `par`
tags : [plot, r-tip]
---

Sometimes you have to work with `base::plot` and to combine multiple plots the solution is e.g. `par(mfrow=c(1,2), ...)`.
Unfortunately using `par` can mess up all your future plots in the active R session.
This is one handy trick to get back to the default settings for plotting:

{% highlight r %}
op = par(mfrow = c(1, 2))
plot(runif(100), runif(100))
plot(runif(100), runif(100))
{% endhighlight %}

![plot of chunk unnamed-chunk-1](../figures/2014-01-10-small-r-tip/unnamed-chunk-1-1.svg)

{% highlight r %}
par(op)
plot(runif(100), runif(100))
{% endhighlight %}

![plot of chunk unnamed-chunk-1](../figures/2014-01-10-small-r-tip/unnamed-chunk-1-2.svg)
