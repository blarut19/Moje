#include "game.hpp"

const int WIDTH = 800, HEIGHT = 600;
bool fullscreen = false;

Game *game = nullptr;

int main(int argc, char *argv[])
{
    game = new Game();

    game->init("Rugby", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, WIDTH, HEIGHT, fullscreen);
    
    game->render();
    while(game->running())
    {
        game->handleEvents();
        game->update();
        //game->render();
    }

    return 0;
}
