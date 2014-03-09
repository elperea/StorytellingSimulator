#pragma strict

var createNormal : Texture2D;
var createHover : Texture2D;

function Start () {

}

function OnMouseEnter () {
	guiTexture.texture = createHover;
}

function OnMouseExit () {
	guiTexture.texture = createNormal;
}

function OnMouseDown () {
	Application.LoadLevel("SceneCreation");
}