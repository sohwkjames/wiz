class Player():
    def __init__(self):
        self.name = ""
        self.score = 0

    def getPlayers(self):
        '''  method to ask user for player name, if player name is Quit then leave.
             Dictionary of playername.storage is checked on existing users. If user
             does not exist he/ she is added.
        '''
        player_name = ''
        player_list = []
        player_list_check = open("Username.txt", "r")
        player_list_append = open("Username.txt", "a")
        quit = False
        player_count = 1
        player_number = int(input('Welcome, how many players:'))
        while player_count <= player_number:
            player_name = input('Please enter player' + str(player_count) + ' name' + ' [enter Quit to leave]').strip()
            if player_name == 'Quit':
                quit = True
                break
            if len(player_name) < 4:
                print("Player Name too short, Please try again")
                break
            if player_name in player_list_check:
                print("Player Name taken, Please try again")
                break
            player_list_append.write(player_name)
            player_list_append.write("\n")
            player_list.append(player_name)
            player_count = player_count + 1
            continue
        return player_list