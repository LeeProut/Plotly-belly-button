# Plotly-belly-button
* building an interactive [dashboard](https://leeprout.github.io/Plotly-belly-button/) to explore a [dataset](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/) that catalogs the microbes found in human navels

### Source
* NC State study on Belly Button Biodiversity, which can be viewed [here](http://robdunnlab.com/projects/belly-button-biodiversity/). 

### Components
* page loads with initial data
* dropdown menu allows the user to select test subjects by ID number
* when an ID is selected, all elements on the page update to display the data that corresponds to that ID
* demographic info box displays the test subject's ethnicity, gender, age, location, belly button type, and wash frequency
* horizontal bar chart displays the top 10 microbial species present for the selected test subject
* bubble chart displays all of the microbial specicies present, in a comparitive visualization, with the marker size varying with the amount of bacteria found

### Landing Page 

![Bellybutton Dashboard](/images/landingpage.png)

### Dynamic data rendering

**Results for subject 1264**  |  **Results for subject 1555**
----------------------------  |  ----------------------------
![Subject 1264](/images/subject1264.png)  |  ![Subject 1555](/images/subject1555.png)



