#pragma strict

static var openThingWindow : boolean = false;
private var no_click : boolean = false;
private var thingName: String="foo";
private var first_click: float;
private var second_click: float;
private var delay: float = 0.5;

function Start () {

}

function OnMouseDown() {
	if(!no_click){
		no_click = true;
		first_click = Time.time;
		//Debug.Log("First click on "+thingName+".");
	}
	else if(no_click){
		no_click = false;
		second_click = Time.time;	
		
		if((second_click - first_click)<delay){
				Debug.Log("Double click on "+thingName+"!");
				openThingWindow = true;
				no_click = false;
		}
	}
}

