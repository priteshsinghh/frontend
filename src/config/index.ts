export const addProductFormElement = [
    {
        label : "Title",
        name : "title",
        componentType : "input",
        type : "text",
        placeholder: "Enter products title",
    },
    {
        label : "Description",
        name : "description",
        componentType : "textarea",
        placeholder: "Enter products description",
    },
    {
        label : "Category",
        name : "category",
        componentType : "select",
        options: [
            { id: "Dishes", label : "Dishes"},
            { id: "Drinks", label : "Drinks"},
            { id: "Fresh Fruits", label : "Fresh Fruites"},
            { id: "Vegetables", label : "Vegetables"},
            { id: "Smoothies", label : "Smoothies"},
            { id: "Nutritions", label : "Nutritions"},   
        ]
    },
    {

        label : "Price",
        name : "price",
        componentType : "input",
        type: "number",
        placeholder: "Enter Price Products",
    },

];