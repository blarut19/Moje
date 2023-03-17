#include <math.h>

#pragma once

class point3D
{
private:
    double x;
    double y;
    double z;
public:
    point3D(double x_pos, double y_pos, double z_pos) {x = x_pos; y = y_pos; z = z_pos;}
    point3D() {}
    ~point3D() {}
    double getX() {return x;}
    double getY() {return y;}
    double getZ() {return z;}
    void setX(double x_pos) {x = x_pos;}
    void setY(double y_pos) {y = y_pos;}
    void setZ(double z_pos) {z = z_pos;}
};