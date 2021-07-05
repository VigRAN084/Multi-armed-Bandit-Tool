function create_slot_machines(n_user_slot_machines, n_algo_slot_machines) {
	user_slot_machines = Array(n_user_slot_machines);
	standard = gaussian(0,1);
	for(var i = 0; i < n_user_slot_machines; i++){
		user_slot_machines[i] = {};
		user_slot_machines[i].name = "#" + (i+1);
		user_slot_machines[i].true_mean = standard();
		user_slot_machines[i].pull_lever = gaussian(user_slot_machines[i].true_mean, 1);
		user_slot_machines[i].n_chosen = 0;
		user_slot_machines[i].total_reward = 0;
		user_slot_machines[i].average_reward = 0;	
    }
}

function setup_interactive_machines(){

    //if reset button has been pressed, we don't need to set up the axes and slot machines 
    // Create the slot machines, set up their properties 
    create_slot_machines(3,3);
    updateScoresForUserMachine(1);
    updateScoresForUserMachine(2);
    updateScoresForUserMachine(3);


}




function updateScoresForUserMachine(n) {
    document.getElementById('user_reward'+ n).innerHTML = user_slot_machines[n-1].total_reward;
    document.getElementById('user_n' + n).innerHTML = user_slot_machines[n-1].n_chosen;
}

function updateTotalUserScore() {
    document.getElementById('userScore').innerHTML = user_score;
}

/** 
	Returns random function with the given mean and stdev.
	Note that this returns a function, not a value. 
**/
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       return retval;
   }
}

function generateRewardUser(choice) {        
    //extract the average rewards from the slot machines
    var average_rewards = user_slot_machines.map((d) => d.average_reward)

    //generate reward
    var reward = user_slot_machines[choice-1].pull_lever()

    //update slot machine parameters
    user_slot_machines[choice-1].n_chosen += 1;
    user_slot_machines[choice-1].total_reward += reward;
    user_slot_machines[choice-1].average_reward = user_slot_machines[choice-1].total_reward / user_slot_machines[choice-1].n_chosen;

    //update score
    user_score += reward;
    updateScoresForUserMachine(choice);
    updateTotalUserScore();
}


