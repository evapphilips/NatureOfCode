class CustomEnv{
    constructor(envSize){
        this.numTilesAcross = envSize;
        // 5 by 5
        //this.map = [["S", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "F"], ["F", "F", "F", "F", "G"]];
        // any size
        this.map = [];
        for(let i=0; i<this.numTilesAcross; i++){
            let row = []
                for(let j=0; j<this.numTilesAcross; j++){
                    row.push("F")    
                }
                this.map.push(row)        
        }
        // set the start and goal
        this.map[0][0] = "S";
        this.map[this.numTilesAcross-1][this.numTilesAcross-1] = "G";
        console.log(this.map);
    }

    changeEnv(mx, my){
        let border = width/6;
        let tileSize = (width - border)/this.numTilesAcross;
        for (let i = 0; i < this.map[0].length; i++){
            for (let j = 0; j < this.map.length; j++){
                if(mx > border+(i*tileSize)-tileSize/4 && mx < border+(i*tileSize)+tileSize/4){
                    if(my > border+(j*tileSize)-tileSize/4 && my < border+(j*tileSize)+tileSize/4){
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
        // show the environment in the canvas
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
                    //fill(0, 255, 0); // if at the start, make the tile green
                    fill(255,255,153)
                }else if(tileCode == "H"){
                    //fill(0); // if a hole, make the tile black
                    fill(79, 98, 114);
                }else if(tileCode == "F"){
                    //stroke(0);
                    //fill(255); // if frozen, make the tile white
                    fill(180, 235, 202);
                }else if (tileCode == "G"){
                    //fill(255, 0, 0); // if at the goal, mae the tile red
                    fill(199, 130, 131);
                }
                // draw the tile
                rectMode(CENTER);
                ellipse(border+(i*tileSize), border+(j*tileSize), tileSize/2, tileSize/2);            
            }
        }
    }

    hideEnv(){
        fill(255);
        rect(width/2, height/2, width, height);
    }
}