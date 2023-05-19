import PIL
from PIL import Image, ImageDraw
import math
from collections import namedtuple

path = "input.png"
lineLength = 40    #change side length of a hexagon here
lineWidth = 2       #change line width here
color = "black"

def drawLines(length, image, verticalStop, horizontalStop, width):

    startPos = [0, 0]
    stopPos = [0, 0]
    i = 0

    while(startPos[0] <= verticalStop +length*math.sqrt(3)/2):
        while(startPos[1] <= horizontalStop):
            #draws horizontal lines
            stopPos[1] = startPos[1] + length
            image.line([*(startPos), *(stopPos)], fill = color, width = width)

            #draws inclined falling lines
            startPos = [int(stopPos[0]+length*math.sqrt(3)/2), int(stopPos[1]+length/2)]
            image.line([*(startPos), *(stopPos)], fill = color, width = width)
            #draws inclined rising lines
            startPos = [int(stopPos[0]-length*math.sqrt(3)/2), int(stopPos[1]+length/2)]
            image.line([*(startPos), *(stopPos)], fill = color, width = width)

            startPos[1] = stopPos[1] + 2*length
            startPos[0] = stopPos[0]

        i += 1
        startPos[0] += int(length*math.sqrt(3)/2)
        startPos[1] = 0
        if(i%2):
            startPos[1] = int(length*1.5)
        stopPos[0] = startPos[0]

"""
img = Image.new("RGB", (900, 500), color="green")
drawImg = ImageDraw.Draw(img)
drawLines(lineLength, drawImg, *img.size, lineWidth)
img.show()
"""

with Image.open(path) as im:
    drawImg = ImageDraw.Draw(im)
    drawLines(lineLength, drawImg, *im.size, lineWidth)
    im.show()
    im.save("hexy.png")
 