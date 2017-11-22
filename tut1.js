//This function shows how the scope of let and var works.
function letVariable(x, y) {
    if (x > y) { // (A)
        let tmp = x;
        x = y;
        y = tmp;
        console.log(x);
    }
    //console.log(tmp===x); // ReferenceError: tmp is not defined
    return [x, y];
}

function varVariable(x, y) {
    if (x > y) { // (A)
        var tmp = x;
        x = y;
        y = tmp;
        //console.log(x);
    }
    
    console.log("var varible scope of x and y respectively",x,y);
    return [x, y];
}

var names = (a,b) => {
    var c = a+b;
    console.log(c);
}

letVariable(11,10);
varVariable(11,10);
names(1,1);