var kitchenStatus = "Working"

var kitchenSlotMachine

function getKitchenPromise() {

	console.log("begin getPromise")

	let kitchenPromise = new Promise( function (resolve, reject) {

			var repeat = 5 // Number of spins
			kitchenSlotMachine.shuffle(repeat, function(){
				//machine_onStopCallback()

				var selected_slot_index = kitchenSlotMachine.active
				console.log("selected_slot_index: ", selected_slot_index)

				var kitchenStatus

				switch (selected_slot_index) {
					case 0:
						console.log ("Power outage")
						kitchenStatus = "Power outage"
						break
					case 1:
						console.log ("On strike")
						kitchenStatus = "On strike"
						break
					case 2:
						console.log ("Ran out of food")
						kitchenStatus = "Ran out of food"
						break
					case 3:
						console.log ("Burger made!")
						kitchenStatus = "Working"
						break
				}

				if (kitchenStatus === "Working") {
					let burger = {
						name: 'Cheeseburger',
						ketchup: 'yes',
						onions: 'no'
					}
					//
					// Kitchen made the burger
					//
					resolve(burger)
				} else {
					let reason = new Error('Problem in the kitchen. Give refund.')
					//
					// There was a problem in the kitchen
					//
					reject(reason)
				}
			})

	})

	console.log("return getPromise")

	return kitchenPromise

}

var spin_machine = function () {
	console.log("begin processOrder")

	//
	// Init state to "pending"
	//
	$("#scene_3_state_pending").show()
	$("#scene_3_state_fulfilled").hide()
	$("#scene_3_state_rejected").hide()

	//
	// Init settled to "no"
	//
	$("#scene_3_settled_yes").hide()
	$("#scene_3_settled_no").show()

	getKitchenPromise()

		//
		// Kitchen made the burger
		//
		.then(function (fulfilled) {
			// you got a burger!
			console.log(fulfilled)

			// Change "Next" scene to Scene 5: Success
			$("#scene_3_next_button").prop("href", "javascript:showScene('scene_5')")

			//
			// Change state to "fulfilled"
			//
			$("#scene_3_state_pending").hide()
			$("#scene_3_state_fulfilled").show()

			//
			// Change settled to "yes"
			//
			$("#scene_3_settled_yes").show()
			$("#scene_3_settled_no").hide()

		})

		//
		// There was a problem in the kitchen
		//
		.catch( function (error) {
			// Sorry. You get a refund.
			console.log("error",error)
			console.log("error.message",error.message)

			// Change "Next" scene to Scene 6: Failure
			$("#scene_3_next_button").prop("href", "javascript:showScene('scene_6')")

			//
			// Change state to "rejected"
			//
			$("#scene_3_state_pending").hide()
			$("#scene_3_state_rejected").show()

			//
			// Change settled to "yes"
			//
			$("#scene_3_settled_yes").show()
			$("#scene_3_settled_no").hide()

		})
}


function showScene(scene_id) {

	var scenes = ['scene_1', 'scene_2', 'scene_3', 'scene_4', 'scene_5', 'scene_6']

	// Hide all scenes
	for (let scene of scenes) {
		$('#' + scene).hide()
	}

	$('#' + scene_id).show()

	if (scene_id === 'scene_3') spin_machine()

}
