#include "SDL2/SDL.h"
#include <vector>
#include <iostream>
#include <stdlib.h>
#include <ctime>
#include <chrono>
#include "vector3D.hpp"

int last_frame = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count();
int framerate = 60;

class Game
{
private:
    bool isRunning;
    SDL_Window *window;
    SDL_Renderer *renderer;
public:
    Game(/* args */);
    ~Game();
    void init(const char* title, int xpox, int ypos, int width, int height, bool fullscreen);
    
    void handleEvents();
    void update();
    void render();
    void clean();

    void wait_to_match_framerate()
    {
        int now = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count();
        while(now - last_frame < 30)
        {
            now = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count();
            continue;
        }
        float frametime = now - last_frame;
        last_frame = now;
    }
    bool running() {return isRunning;}
};


Game::Game()
{

}
Game::~Game()
{
    
}
void Game::init(const char* title, int xpos, int ypos, int width, int height, bool fullscreen)
{
    int flags = 0;
    if (fullscreen)
    {
        flags = SDL_WINDOW_FULLSCREEN;
    }
    
    if (SDL_Init(SDL_INIT_EVERYTHING) == 0)
    {
        std::cout << "Initialised" << std::endl;

        window = SDL_CreateWindow(title, xpos, ypos, width, height, flags);
        if(window)
            std::cout << "Window created" << std::endl;
        
        renderer = SDL_CreateRenderer(window, -1, 0);
        if (renderer)
            {
                SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
                std::cout << "Renderer created" << std::endl;
            }
        
        isRunning = true;
    }
    else
    {
        isRunning = false;
    }
}
void Game::update()
{

}
void Game::render()
{
    SDL_RenderClear(renderer);
    SDL_RenderPresent(renderer);
}
void Game::handleEvents()
{
    SDL_Event event;
    SDL_PollEvent(&event);
    switch (event.type)
    {
    case SDL_QUIT:
        isRunning = false;
        break;
    
    default:
        break;
    }
}
void Game::clean()
{
    SDL_DestroyWindow(window);
    SDL_DestroyRenderer(renderer);
    SDL_Quit();
    std::cout << "Game cleaned" << std::endl;
}

