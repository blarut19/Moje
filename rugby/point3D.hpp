#include <math.h>

#pragma once

class point3D
{
private:
    float x;
    float y;
    float z;
public:
    point3D(float x_pos, float y_pos, float z_pos) {x = x_pos; y = y_pos; z = z_pos;}
    point3D() {}
    ~point3D() {}
    float getX() {return x;}
    float getY() {return y;}
    float getZ() {return z;}
    void setX(float x_pos) {x = x_pos;}
    void setY(float y_pos) {y = y_pos;}
    void setZ(float z_pos) {z = z_pos;}
};