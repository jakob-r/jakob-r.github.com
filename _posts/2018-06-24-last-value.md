---
layout: post
title: Last Value
tags : [r-tip]
---


Have you calculated something in R that took some time but you forgot to save the result?
Fear no more.
`.Last.value` always stores the last result.


{% highlight r %}
runif(5)
{% endhighlight %}



{% highlight text %}
## [1] 0.61736122 0.02023587 0.28592244 0.60450306 0.84834418
{% endhighlight %}



{% highlight r %}
mean(.Last.value)
{% endhighlight %}



{% highlight text %}
## [1] 0.4752734
{% endhighlight %}
