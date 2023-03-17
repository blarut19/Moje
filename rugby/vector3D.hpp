#include "point3D.hpp"
#include <string>
#include <iostream>

#pragma once

class vector3D
{
private:
    double x;
    double y;
    double z;
public:
    vector3D() {}
    vector3D(double x_pos, double y_pos, double z_pos) {x = x_pos; y = y_pos; z = z_pos;}
    vector3D(point3D p1, point3D p2) {x = p2.getX() - p1.getX(); y = p2.getY() - p1.getY(); z = p2.getZ() - p1.getZ();}
    ~vector3D() {};
    vector3D operator=(vector3D left) {left.setX(x); left.setY(y); left.setZ(z); return left;}
    double getX() {return x;}
    double getY() {return y;}
    double getZ() {return z;}
    void setX(double x_pos) {x = x_pos;}
    void setY(double y_pos) {y = y_pos;}
    void setZ(double z_pos) {z = z_pos;}
    void normalize();
    double calcMagnitude();
    std::string repr();
    double dotProduct(vector3D v);
    vector3D crossProduct(vector3D v);
    double angleBetween(vector3D v);
};

void vector3D::normalize()
{
    double magnitude = calcMagnitude();
    x = x/magnitude;
    y = y/magnitude;
    z = z/magnitude;
}

double vector3D::calcMagnitude()
{
    return sqrt(pow(x, 2) + pow(y, 2) + pow(z, 2));
}

std::string vector3D::repr()
{
    return "[" + std::to_string(x) + ", " + std::to_string(y) + ", " + std::to_string(z) + "]";
}

vector3D vector3D::crossProduct(vector3D v)
{
    vector3D result(y*v.getZ() - z*v.getY(), z*v.getX() - x*v.getZ(), x*v.getY() - y*v.getX());
    return result;
}

double vector3D::dotProduct(vector3D v)
{
    return x * v.x + y * v.y + z * v.z;
}

double vector3D::angleBetween(vector3D v)
{
    double dp = dotProduct(v);
    double magnitude1 = calcMagnitude();
    double magnitude2 = v.calcMagnitude();
    if (magnitude1 == 0 || magnitude2 == 0)
    {
        return 0;
    }
    
    double cos0 = dp/magnitude1/magnitude2;
    return acos(cos0);
}