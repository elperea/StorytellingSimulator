#pragma strict

public var userGUI: GameObject;

static var sequence: int=1;
static var playSeq = new Array();

var scriptWindow: Rect = Rect(10,10,300,300);
var openScriptWindow: boolean = false;
var scriptID: int = 0;
var wait: boolean = false;

public var splitAct: String[];

//list of scripts
static var proxyCharacter: CharacterScript;
static var proxyGUI: UserGUI;

function OnGUI(){
	if(GUI.Button(Rect(Screen.width*4/5,Screen.height*3/6+60,120,Screen.height/6-30),"See Script")){
		openScriptWindow = true;
	}
	if(openScriptWindow){
		scriptWindow = GUI.Window(scriptID,scriptWindow,ShowFriendlyScript,"The Script so Far");
	}
	if(GUI.Button(Rect(Screen.width*4/5,Screen.height*5/6,120,Screen.height/6-30),"Play All")){
		LightsCameraAction();
	}
	if(GUI.Button(Rect(Screen.width*4/5,Screen.height*4/6+30,120,Screen.height/6-30),"Play This")){
	
	}
}
function Start () {
	
}

function Update () {

}

function LightsCameraAction(){
	var actString : String[] = playSeq.ToBuiltin(String) as String[];
	proxyGUI = userGUI.GetComponent(UserGUI);
	for(var act: String in actString){
	splitAct = act.Split(" "[0]);
	Debug.Log("To find: "+splitAct[0]);
	//gets the object to act, then waits for it to finish
	var actObj: GameObject = GameObject.Find(splitAct[0]);
	//find object then fix camera to that object
	SearchObject(actObj);
	proxyCharacter = actObj.GetComponent(CharacterScript);
	//call object
	if(splitAct[1] == "walk" || splitAct[1] == "talk"){
		yield proxyCharacter.ShowTime(splitAct);
	}
	else{
		Debug.Log("Error in LightsCameraAction function.");	
	}
	}

}

function SearchObject(findObj: GameObject){
	var splitName: String[] = findObj.name.Split(":"[0]);
	proxyGUI = userGUI.GetComponent(UserGUI);
	var weAre : int = proxyGUI.curr_scene;
	var weGo : int = int.Parse(splitName[0]);
	//ex: we are at curr_scene 1, we need object in curr_scene 3, so diff = 2.
	var diff : int = weGo - weAre;
	Debug.Log("move scenes by "+diff);
	//if positive, then move camera diff*25 accordingly to the right, o.w. move diff*25 accordingly to the left
	var toAdd: int = diff * 25;
	proxyGUI.cam_z += toAdd;
	proxyGUI.cam_x += -toAdd;
	proxyGUI.z += toAdd;
	proxyGUI.x += -toAdd;
	proxyGUI.curr_scene = weGo;

}

function ShowFriendlyScript(windowID: int){
	var scriptloop: int = 20;
	var i: int;
	GUI.Label(Rect(10,10,200,30),"Starting from the top:");
	var playString : String[] = playSeq.ToBuiltin(String) as String[];
	for(var action: String in playString){
		var splitShow : String[] = action.Split(" "[0]);
		var tempObj : GameObject = GameObject.Find(splitShow[0]);
		var splitName : String[] = splitShow[0].Split(":"[0]);
		//for now, all character models get the CharacterScript. It enables them to walk and talk. shet, dang. shet.
		proxyCharacter = tempObj.GetComponent(CharacterScript);
		if(splitShow[1] == "walk"){
			GUI.Label(Rect(10,scriptloop,200,30),""+proxyCharacter.myName+" is "+splitShow[1]+"ing "+splitShow[2]+" for "+splitShow[3]+" steps");
			}
		else if(splitShow[1] == "talk"){
			GUI.Label(Rect(10,scriptloop,200,30),""+proxyCharacter.myName+" is "+"saying "+splitShow[2]);
			}
		scriptloop = scriptloop+20;
		}
		//Debug.Log(action+" "+playString.length+" "+tempObj.name+" "+scriptloop);
	if (GUI.Button (Rect (scriptWindow.width-80,scriptWindow.height-40,70,30),"Cancel")){
			openScriptWindow = false;
	}
}


function Record(message: String){
	
}