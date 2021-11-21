# Elevai

Eleveting predictive maintenance by combining collective domain expert knowledge and artificial intelligence.

<all app screens>

## Introduction

Kone moves over 1 billion people per day. Having any friction in this people flow is extremely costly. Predicting the need for maintenance and preventing unexpected equipment failures is key for Kone's high quality brand.

And it's not all about the brand. A lift that doesn't move can mean residents are not able to access their houses. A technician that is send to repear equipment that's not broken postpones reparation of an actually broken device.


## Data

To create systems that can learn data is needed. Having data is not enough. Quality data is needed for good model performance. In academia datasets can be perfert, but in real life that's often not the case. To understand the problem we did some investigation on the data.

### Imbalanced classes

First thing that poped up was the imblanceness of the data. Most of the events (87% of the data) are events where equipment needed maintenance (class 1). Rest of the events are for equipment which was working fine (class 0). Due to this high imbalanceness benchmark model was able to perform well by just predicting all events as `correct maintenance event` (class 1).

### Imbalanced subcategories

Clustering the data revealed that some categories are creating most of the events. What this means is that some equipment with certain sensors is overpopulated in the data compared to other subcategories. To make it even harder some of these categories seem to produce a lot of incorrect maintence signals.

If underlying features are noise for some subcategories model can't learn them. If these events are overpopulated in the data model results are hard to interpret since good performance in some areas of the data can be hard to notice. Cost of an event is high which means that better performance in some areas of the data is valuable.

We were able to show better performance in some subcategories. Example:
```
Subcategory:
- action_recommendation_category:  arc02
- usage_type: ut011
- equipment_category: tp007
- event count: 2679

Baseline performance:
- f2 score: 0.92299
- accuracy: 0.70586

Our Model:
- f2 score: 0.926601
- accuracy: 0.737212
```

This means that when the data is good we can learn. We just have to ensure better data is available.

### Model architecture
<write>


### Model results
<list model results here with explanation>

All this knowledge from the data revealed us that improving the model significantly would be an impossible task. The actual problem is that the underying features are not good enough. That lead us to find out the perfect solution.


## How it's used in real life

In our solution we ended up solving the problem in two ways:

1. We want to use machine learning as well as possible despite the limitations in the current dataset. This means that we have to be able to identify the reliable predictions from the unreliable once. We did it by tagging all event our system predicted unreliable for the technician. Technician is able to do the final decision then based on the model prediction and historical maintance data show in the app.

2. Unneeded maintance event is not wasted if we can collect information from it. Our app allows the technication to specify why a visit was needed or not. This will increase the visibility on the raw signals that the sensors produce. This means that for example in case where repair parts have a quality error this should be visible in our data very quickly since technicians over the world can mark that high wear in a specific mechanical part was the reason for the maintenance need.

Check out how our app allows the technician to make the correct decision on maintenance task.


1. First view lists the maintance events categorized by the reliability: events with uncertantly require actions from the technician before the visit
2. To help techication make the right decision the event view shows maintenance history and people who where involved with the last maintancen events. For further analysis the technician is able to see the underlying cencor data. This data is sorted based on the relevance from the previous insidents that had overlapping features.
3. After maintenance visit technician marks the data sources that were important to find out the underlying problem. These findings are shared between all technicians globally which ensures better knowledge sharing. This data is also important for the personel which design algorithms that use the data.
4. As a final thing we want to ensure ability to inspect the equipment remote as much as possible. AR allows the technician to visualize the object for remote inspection.


Acknowledgment

- data plots
