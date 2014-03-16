#pragma strict

var environment: GameObject;

//each asset included
var character: GameObject;
static var char_count = 0;
var thing: GameObject;
static var thing_count = 0;

//sample na idadagdag natin
var other_character: GameObject;
static var other_character_count = 0;

var rosterWindow: Rect = Rect(10,10,300,300);
var openWindow : boolean = false;
var editWindow : boolean = false;

static var x=0;
static var y=0;
static var z=0;
static var max_x=0;
static var max_y=0;
static var max_z=0;
static var cam_x=-10;
static var cam_y=8;
static var cam_z=-10;

static var scene_count = 0;
static var curr_scene = 0;

static var top_margin = 30;
static var obj_count = 0;

static var curr_environment: GameObject;
static var disp_det: String="";

static var obj_array = new Array();
function OnGUI () {
	
	//GUI.Box(Rect(Screen.width*4/5-10, 10,Screen.width/5,Screen.height-50),"Roster");
	if(GUI.Button(Rect(Screen.width*4/5,top_margin,Screen.width/6,30),"+")){
		openWindow = true;
	}
	if(openWindow){
		rosterWindow = GUI.Window(0,rosterWindow,AddEntity,"Adding an Entity");
	}
	//GUI.Box(Rect(Screen.width/6, Screen.height*5/6-10,Screen.width*3/5,Screen.height/6-10),"");
	
	//edit out ko muna
	/*var top = 30;
	//for(var i=0, top = 30; i<obj_count; i++, top+=30) {
	 for(var i : int = 0; i < obj_count; i++){
	 	//check if obj is character or not..
	 	var object : GameObject;
	 	object = obj_array[i];
	 	var te = object.transform.gameObject.name;
	 	//newAddedGO.name == string.Format("{0}(Clone)", myNeedPrefab.name
	 	
	 	
	 	//Debug.Log(te);
	 	//Debug.Log("(Clone)Thing");
	 	
	 	if (te == "Thing(Clone)") {
	 		if(GUI.Button(Rect(Screen.width*4/5,top,Screen.width/6,30), thing.GetComponent(ThingScript).myName)) {
		 		editWindow = true;
		 	}
	 	} else {
		 	if(GUI.Button(Rect(Screen.width*4/5,top,Screen.width/6,30), character.GetComponent(CharacterScript).myName)) {
		 		editWindow = true;
		 	}
	 	}
	 	
	 	
	 	top = top + 40;
	}*/
	
	if(curr_scene>1){
		if(GUI.Button(Rect(Screen.width/6+100,Screen.height*5/6,50,Screen.height/6-30),"<<")){
			if(curr_environment){
				curr_environment.GetComponent(EnviScript).enabled = false;
			}
		
			cam_z += -25;
			cam_x += 25;
			z += -25;
			x += 25;
			
			curr_scene--;
			
			curr_environment = GameObject.Find("env"+curr_scene);
			curr_environment.GetComponent(EnviScript).enabled = true;
			disp_det = curr_environment.GetComponent(EnviScript).place;
			Debug.Log("We are at "+disp_det);
		}
	}
	if(curr_scene<scene_count){
		if(GUI.Button(Rect(Screen.width/6+160,Screen.height*5/6,50,Screen.height/6-30),">>")){
			if(curr_environment){
				curr_environment.GetComponent(EnviScript).enabled = false;
			}
			cam_z += 25;
			cam_x += -25;
			z += 25;
			x += -25;
			
			curr_scene++;
			
			curr_environment = GameObject.Find("env"+curr_scene);
			curr_environment.GetComponent(EnviScript).enabled = true;
			disp_det = curr_environment.GetComponent(EnviScript).place;
			Debug.Log("We are at "+disp_det);
		}
	}
	if(GUI.Button(Rect(Screen.width/6+10,Screen.height*5/6,50,Screen.height/6-30),"+")){
			if(curr_environment){
				curr_environment.GetComponent(EnviScript).enabled = false;
			}
			max_z+=25;
			max_x+=-25;
			z = max_z;
			x = max_x;
			cam_z=max_z-10;
			cam_x=max_x-10;
			
			var temp_env: GameObject;
			temp_env = Instantiate(environment, Vector3(max_x,max_y,max_z),Quaternion.identity);
			
			
			scene_count = scene_count+1;
			curr_scene = scene_count;
			temp_env.name = "env"+curr_scene;
			
			curr_environment = GameObject.Find("env"+curr_scene);
			curr_environment.GetComponent(EnviScript).freshly_baked = true;
			disp_det = curr_environment.GetComponent(EnviScript).place;
			Debug.Log("We are at "+disp_det);
	}
	GUI.Label(Rect(20,20,150,30),disp_det);
}

function AddEntity(windowID: int){
		//top_margin = top_margin + 40;
		if (GUI.Button (Rect (10,20,150,30), "Create Character")){
		
			var tempchar : GameObject;
			tempchar = Instantiate(character,Vector3(x,y+1,z),Quaternion.identity);
			tempchar.GetComponent(CharacterScript).characterID = char_count;
			tempchar.name = "char"+char_count;
			char_count++;
			//obj_array.Push(tempchar);
			//obj_count++;
			//top_margin = top_margin + 40;
			openWindow = false;
		}
		if (GUI.Button (Rect (10,60,150,30), "Create Thing")){
		
			var tempthing : GameObject;
			tempthing = Instantiate(thing,Vector3(x,y+1,z),Quaternion.identity);
			tempthing.GetComponent(ThingScript).thingID = thing_count;
			tempthing.name = "thing"+thing_count;
			thing_count++;
			//obj_array.Push(tempthing);
			//obj_count++;
			//top_margin = top_margin + 40;
			openWindow = false;
		}
		if (GUI.Button (Rect (rosterWindow.width-80,rosterWindow.height-40,70,30),"Cancel")){
			openWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}


