#pragma strict

var playNormal : Texture2D;
var playHover : Texture2D;

function Start () {

}

function OnMouseEnter () {
	guiTexture.texture = playHover;
}

function OnMouseExit () {
	guiTexture.texture = playNormal;
}

function OnMouseDown () {
	//Application.Quit();
}