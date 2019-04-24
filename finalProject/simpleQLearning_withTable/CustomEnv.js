class CustomEnv{
    constructor(envSize){
        this.numTilesAcross = envSize;
        this.map = [["S", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "G"]];

    }

    changeEnv(mx, my){
        let border = width/6;
        let tileSize = (width - border)/this.numTilesAcross;
        for (let i = 0; i < this.map[0].length; i++){
            for (let j = 0; j < this.map.length; j++){
                if(mx > border+(i*tileSize)-tileSize/8 && mx < border+(i*tileSize)+tileSize/8){
                    if(my > border+(j*tileSize)-tileSize/8 && my < border+(j*tileSize)+tileSize/8){
                        if(this.map[j][i] == "H"){
                            this.map[j][i] = "F"
                        }else if(this.map[j][i] == "F"){
                            this.map[j][i] = "H"
                        }
                    }
                }

            }
        }
        return this.map 
    }

    showEnv(){
        // show the encironment in the canvas
        let border = width/6;
        let tileSize = (width - border)/this.numTilesAcross;

        for (let i = 0; i < this.map[0].length; i++){
            for (let j = 0; j < this.map.length; j++){
                // set color of tile based on the map
                noStroke();
                fill(255);
                rect(border+(i*tileSize), border+(j*tileSize), tileSize, tileSize); 
                
                let tileCode = this.map[j][i]
                if(tileCode == "S"){
                    fill(0, 255, 0); // if at the start, make the tile green
                }else if(tileCode == "H"){
                    fill(0); // if a hole, make the tile black
                }else if(tileCode == "F"){
                    stroke(0);
                    fill(255); // if frozen, make the tile white
                }else if (tileCode == "G"){
                    fill(255, 0, 0); // if at the goal, mae the tile red
                }
                // draw the tile
                rectMode(CENTER);
                ellipse(border+(i*tileSize), border+(j*tileSize), tileSize/4, tileSize/4);            
            }
        }
    }
}