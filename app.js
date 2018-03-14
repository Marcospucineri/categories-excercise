var Categories = [
	new Category(100,-1,'Business','Money'),
	new Category(200,-1,'Tutoring','Teaching'),
	new Category(101,100,'Accounting','Taxes'),
	new Category(102,100,'Taxation'),
	new Category(201,200,'Computer'),
	new Category(103,101,'Corporate Tax'),
	new Category(202,201,'Operating System'),
	new Category(109,101,'Small business Tax')
]

function getCategoryById(id){
	return Categories.find(x => x.CategoryId === id);
}

function getParentCategory(category){
	return getCategoryById(category.ParentCategoryId)
}

function getCategoryKeyword(category){
	if (category.Keywords){
		return category.Keywords
	} 
	return getCategoryKeyword(getParentCategory(category));
}

function getCategoryLevel(category){
	var level = 1;
	if (category.ParentCategoryId == -1){
		return level;
	} else {		
		return level + getCategoryLevel(getParentCategory(category));
	}
}

function getCategoriesByLevel(level){
	var CategoriesMatched = [];
	Categories.forEach( function(element) {
		if (level == getCategoryLevel(element)){
			CategoriesMatched.push(element);
		}
	});
	return CategoriesMatched;
}

/* DOM FUNCTIONS */
function domFunctions(){

	document.getElementById("btnGetCategoryDetails").addEventListener("click", function(){		
	    
	    document.getElementById("ResultText").innerHTML = "";
		var inputValue = document.getElementById("txtCategoryId").value;
		var category = getCategoryById(parseInt(inputValue));
	    document.getElementById("ResultText").innerHTML = "ParentCategoryID=" + category.ParentCategoryId + '\n' + 
	    												  ", Name=" + category.Name + '\n' +
	    												  ", Keywords=" + getCategoryKeyword(category);

	});

	document.getElementById("btnGetCategoriesFromLevel").addEventListener("click", function(){	
	    
	    document.getElementById("ResultText").innerHTML = "";
		var inputValue = document.getElementById("txtLevel").value;
		var levelCategories = getCategoriesByLevel(inputValue);
		var output = "";
		levelCategories.forEach( function(element) {
			output += element.CategoryId + ' : ' + element.Name + ' / ';
		});
	    document.getElementById("ResultText").innerHTML = output;

	});

}


