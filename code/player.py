class Player():
    def getPlayers(cls):
        '''  method to ask user for player name, if player name is Quit then leave.
             Dictionary of playername.storage is checked on existing users. If user
             does not exist he/ she is added.
        '''
        player_name = ''
        player_list_check = open("/Username.txt", "r")
        player_list_append = open("/Username.txt", "a")
        quit = False
        while len(player_name) < 4 and not quit:
            player_name = input('Hello! What is your name [enter Quit '
                              'to leave]?: ').strip().capitalize()
            if player_name == 'Quit':
                quit = True

        else:
            for line in player_list_check:
                if player_name in line:
                    print("Player Name taken, Please try again")
                    break
                else:
                    player_list_append.write(player_name)
                    player_list_append.write("\n")
