from PIL import Image
import requests
import os
import sys
from datetime import datetime, timedelta

#temperature - "forecastTemp"
#clouds - "forecastCloud"
#rain - "forecastPrecip"

#timestamp = date.strftime("%Y%m%d%H%M")
#human_friendly = date.strftime("%Y_%m_%d_%H_%M")

def get_forecast_for_date(timestamp, map_type):
    return requests.get("https://en.sat24.com/image?type="+map_type+"&region=europa&timestamp="+timestamp)

def save_forecast(my_path, name, response):
    if len(response.content) <= 154:
        print("Could not get image: " + name)
        return
    if not os.path.isdir(my_path):              #check if there is an appropriate directory
        os.mkdir(my_path)                       #make a direcotry if there isn't
    if os.path.isfile(my_path+"/"+name+".png"): #check if there is a previous forecast
        i = 2
        while os.path.isfile(my_path+"/"+name+"_"+str(i)+".png"):
            i += 1
        with open(my_path+"/"+name+"_"+str(i)+".png", "wb") as f:   #save forecast with the next free number
            f.write(response.content)
    else:
        with open(my_path+"/"+name+".png", "wb") as f:  #save forecast if it's the first one
            f.write(response.content)
    print("Image " + name + " saved")

def save_forecast_for_day(d, map_type):
    for i in range(8):                          #sat24 uploads a map 8 times a day every 3 hours so at 00:00, 03:00, 06:00, ..., 21:00
        d = d.replace(hour=i*3, minute = 0)
        rsp = get_forecast_for_date(d.strftime("%Y%m%d%H%M"), map_type) #provide timestamp and map type
        save_forecast(d.strftime("%Y_%m_%d"), map_type[8:]+d.strftime("%Y_%m_%d_%H_%M"), rsp)

def save_forecast_for_week(d, map_type):
    for i in range(7):
        save_forecast_for_day(d+timedelta(days=i), map_type)

save_forecast_for_week(datetime.today(), "forecastCloud")
save_forecast_for_week(datetime.today(), "forecastTemp")