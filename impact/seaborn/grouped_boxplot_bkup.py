# I'm saving this file manually in TW-Charts/seaborn/grouped_boxplot_bkup.by cutting and pasting. Not sure where clicking save icon places it.

import pandas as pd
import os
import seaborn as sns
sns.set(style="ticks", palette="pastel")

# Load the example tips dataset
#tips = sns.load_dataset("tips")

# Loading a local file does not work because path is at user's root.
#print("Current directory: {}".format(os.getcwd()))
#tips = pd.read_csv("Tampa-ByDay-Local.csv")

#tips = pd.read_csv("/Users/East/Data/TW-Charts/seaborn/data/p/all_p.csv")
tips = pd.read_csv("/Users/East/Data/TW-Charts/seaborn/data/stepdiff/diff.csv")
#tips = pd.read_csv("/Users/East/Data/TW-Charts/seaborn/data/gyration/ja2017_tokyo_gyration.csv")

#pd.set_option('display.max_columns', None)

print(type(tips))

#print(tips)

# step_type Yes No initially, then add the number.
# day (Fri, Sat, Sun) equivalent could be storm or day (impact and norm)
# palette would need to be increased to cover the number of storms

#sns.set(rc={'figure.figsize':(11.7,8.27)})
#sns.boxplot(x="day", y="displacement",hue="step_type", palette=["c", "g", "b", "y", "r", "m"],data=tips)

#sns.set(rc={'figure.figsize':(15.7,9.5)}) # Radius of gyration
#sns.set(rc={'figure.figsize':(24,9.5)})
#sns.set(style="whitegrid") #Adds horizontal lines, naw.

#ax.set_title('Typhoon Haiyan, Cebu City, 2013-11-08, 140 kph',fontsize=28)
#ax.set_title('Mangkhut, Hong Kong, 2018-09-15, 5 pm, 135 kph',fontsize=28)

### Radius of Gyration - Change to x="days3" to cluster boxplots by 3 day intervals
#ax = sns.boxplot(x="days", y="radius_of_gyration",data=tips)
#ax.set_ylabel('Radius of Gyration (km)',fontsize=24)
#ax.set_xlabel('Days from Impact',fontsize=20)

### Daily Travel Distances (1,4,6) - Use with data/stepdiff/diff.csv
## y="change" or "thediff" or "diffPercent"
#ax = sns.boxplot(x="label", y="change", hue="step_type", palette=["c", "g", "b", "y", "r", "m"], data=tips)
#ax.set_ylabel('Diff Impact to Norm Displacements (%)',fontsize=24)
#ax.set_xlabel('',fontsize=20) # Impacted Cities (6 Steps)

### Daily Travel Diff Percent (Ryan's initial approach)
## "thediff" or "diffPercent"
ax = sns.boxplot(x="label", y="diffpercent", hue="step_type", palette=["c", "g", "b", "y", "r", "m"], data=tips)
ax.set_ylabel('Diff Impact to Norm Displacements (%)',fontsize=24)
ax.set_xlabel('',fontsize=20) # Impacted Cities (6 Steps)

### Perturbation Degree
#ax = sns.boxplot(x="label", y="change",data=tips)
#ax.set_ylabel('Perturbation Degree',fontsize=24)
#ax.set_xlabel('Impacted Cities and Wind Speed (mph)',fontsize=20)


ax.tick_params(labelsize=16)

# https://dustinoprea.com/2015/05/17/beautiful-python-charts-using-seaborn/
# Rotate the x-labels
#ax.set_xticklabels(labels, rotation=_ROTATION_DEGREES)
# Add some margin to the bottom so the labels aren't cut-off.
#matplotlib.pyplot.subplots_adjust(bottom=_BOTTOM_MARGIN)
 

#tips = pd.read_csv("/Users/East/Data/TW-Charts/seaborn/data/ph2013_cebu_city_31day_gyration.csv")
#sns.boxplot(x="days", data=tips)
# Draw a nested boxplot to show bills by day and time
#sns.boxplot(x="day", y="total_bill",
#            hue="smoker", palette=["m", "g"],
#            data=tips)




