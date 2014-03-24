#pragma strict

public var userGUI: GameObject;
public var Playwright: GameObject;
public var openCharacterWindow : boolean = false;
public var openErrorWindow : boolean = false;

public var doing: boolean = false;
public var speaking : boolean = false;
public var toSay: String;
public var speaker: String;

public var tempName: String="";
//public var tempSeq: String="";
public var tempAct: String="";
public var myName: String = "foo";
public var characterID: int;
public var errorID: int;

public var showTime: boolean = false;

public var errorWindow : Rect = Rect(Screen.width/2-100,Screen.height/2-50,300,100);
public var characterWindow: Rect = Rect(10,10,400,200);

private var can_drag : boolean = false;
private var no_click : boolean = false;

private var first_click: float;
private var second_click: float;
private var delay: float = 0.5;
private var y_position : float;
private var gravitySetting : boolean;

static var MomScript: MotherScript;


function Start () {
	MomScript = Playwright.GetComponent(MotherScript);
}

function ShowTime(getAction: String[]){
	doing = true;
	//var getAction: String[] = MomScript.splitAct;
	//gets the splitact parts
	if(getAction[1] == "walk"){
		if(getAction[2] == "north"){
			//transform.translate
			Debug.Log(getAction);
			yield WaitForSeconds(2);
		}
		else if(getAction[2] == "south"){
			//transform.translate
			Debug.Log(getAction);
			yield WaitForSeconds(2);
		}
		else if(getAction[2] == "east"){
			//transform.translate
			Debug.Log(getAction);
			yield WaitForSeconds(2);
		}
		else if(getAction[2] == "west"){
			//transform.translate
			Debug.Log(getAction);
			yield WaitForSeconds(2);
		}
	}
	else if(getAction[1] == "talk"){
		speaker = myName;
		for(var j=2;j<getAction.length;j++){
		toSay = toSay + " " + getAction[j];
		}
		speaking = true;
		yield WaitForSeconds(5);
		speaking = false;
	}
	doing = false;
}

function OnMouseDown() {
	if(!no_click){
		no_click = true;
		can_drag = true;
		first_click = Time.time;
		//Debug.Log("First click on "+CharacterName+".");
	}
	else if(no_click){
		no_click = false;
		second_click = Time.time;	
		if((second_click - first_click)<delay){
			Debug.Log("Double click on "+ myName +"! "+openCharacterWindow);
			openCharacterWindow = true;
			no_click = false;
		}
	}
}

function OnGUI(){
	if(openCharacterWindow){
		characterWindow = GUI.Window(characterID,characterWindow,EditCharacter,"Editing Character");
	}
	if(openErrorWindow){
		errorWindow = GUI.Window(errorID,errorWindow,PopError,"Error");
	}
	if(speaking){
	//Debug.Log("Saying this:" + toSay);
	GUI.Label(Rect(100,Screen.height/2,300,100),speaker+": "+toSay);
	}
}

function OnMouseUp(){
	can_drag = false;
}

function OnMouseDrag()
{
	//transform.position = Vector3(Input.mousePosition.x,UserGUI.y,Input.mousePosition.z);
}

function EditCharacter(windowID: int){
	GUI.Label(Rect(10,20,70,30),"Name");
	tempName = GUI.TextField(Rect(80,20,160,30),tempName,20);
	GUI.Label(Rect(10,60,70,30),"Sequence");
	GUI.Label(Rect(80,60,30,30),""+Playwright.GetComponent(MotherScript).sequence);
	//tempSeq = GUI.TextField(Rect(80,60,30,30),tempSeq,2);
	GUI.Label(Rect(10,100,70,30),"Action");
	tempAct = GUI.TextField(Rect(80,100,170,30),tempAct,30);
	
	if (GUI.Button (Rect (characterWindow.width-160,characterWindow.height-40,70,30),"OK")){
			myName = tempName;
			//check validity of action
			var splitAct : String[] = tempAct.Split(" "[0]);
			//working on walk and talk first
			if(splitAct[0] == ""){
			openCharacterWindow = false;
			}
			else if(splitAct[0] == "walk")
				{
				if(splitAct[1] == "north" || splitAct[1] == "south" || splitAct[1] == "east" || splitAct[1] == "west"){
					var step = int.Parse(splitAct[2]);
					if(step>0 && step<10)
						{
						//valid
						var objAct: String = this.name + " " + tempAct;
						Playwright.GetComponent(MotherScript).playSeq.Push(objAct);
				
						//if valid
						Playwright.GetComponent(MotherScript).sequence++;
						openCharacterWindow = false;
						}
						else
						{
						errorID = 2;
						openCharacterWindow = false;
						openErrorWindow = true;
						
						}
				}
				else
				{
				errorID = 1;
				openCharacterWindow = false;
				openErrorWindow = true;
				}
				
				}
			else if(splitAct[0] == "talk")
				{
				//valid
				var objTalk: String = this.name + " " + tempAct;
				Playwright.GetComponent(MotherScript).playSeq.Push(objTalk);
			
				//if valid
				Playwright.GetComponent(MotherScript).sequence++;
				openCharacterWindow = false;
				}
			else
				{
				errorID = 0;
				openCharacterWindow = false;
				openErrorWindow = true;
				}
		}
	if (GUI.Button (Rect (characterWindow.width-80,characterWindow.height-40,70,30),"Cancel")){
			openCharacterWindow = false;
		}
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}

function PopError(windowID: int){
	//if statements
	if(windowID==0){
	GUI.Label(Rect(10,20,300,30),"Error in getting the command!");
	}
	else if(windowID==1){
	GUI.Label(Rect(10,20,300,30),"You're not walking in the correct direction!");
	}
	else if(windowID==2){
	GUI.Label(Rect(10,20,300,30),"Number of steps must only be 1 to 10!");
	}
	if(GUI.Button(Rect(errorWindow.width-80,errorWindow.height-40,70,30),"OK")){
		openErrorWindow = false;
	}
	GUI.DragWindow (Rect(0,0,10000,10000));
}