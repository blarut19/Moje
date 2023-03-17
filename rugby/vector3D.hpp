#include "point3D.hpp"
#include <string>
#include <iostream>

#pragma once

class vector3D
{
private:
    float x;
    float y;
    float z;
public:
    vector3D() {}
    vector3D(float x_pos, float y_pos, float z_pos) {x = x_pos; y = y_pos; z = z_pos;}
    ~vector3D() {};
    float getX() {return x;}
    float getY() {return y;}
    float getZ() {return z;}
    void setX(float x_pos) {x = x_pos;}
    void setY(float y_pos) {y = y_pos;}
    void setZ(float z_pos) {z = z_pos;}
    void normalize();
    float calcMagnitude();
    std::string repr();
    float dotProduct(vector3D v);
    float angleBetween(vector3D v);
};

void vector3D::normalize()
{
    float magnitude = calcMagnitude();
    x = x/magnitude;
    y = y/magnitude;
    z = z/magnitude;
}

float vector3D::calcMagnitude()
{
    return sqrt(pow(x, 2) + pow(y, 2) + pow(z, 2));
}

std::string vector3D::repr()
{
    return "[" + std::to_string(x) + ", " + std::to_string(y) + ", " + std::to_string(z) + "]";
}

float vector3D::dotProduct(vector3D v)
{
    return x * v.x + y * v.y + z * v.z;
}

float vector3D::angleBetween(vector3D v)
{
    float dp = dotProduct(v);
    float magnitude1 = calcMagnitude();
    float magnitude2 = v.calcMagnitude();
    float cos0 = dp/magnitude1/magnitude2;
    std::cout<<repr()<<" . "<<v.repr()<<" = "<<dp<<std::endl;
    return acos(cos0);
}