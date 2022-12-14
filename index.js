import { mergeSort,isSorted } from "./mergeSort.js";
import { Node } from "./Node.js";
import { randomArray,randomNumber} from "./random.js";

const Tree = (arr) => {

    let root = Node();

    const build = (arr) => {
        //Builds a Balanced Binary Search Tree
        //from a given array

        if(!Array.isArray(arr)){
            console.error('ERROR: Array expected')
            return
        }

        if(arr.length===1)
            return Node(arr[0])

        //Convert array to set to remove duplicated values
        arr = [...new Set(arr)];

        if(!isSorted(arr))
            arr = mergeSort(arr);

        if(arr.length===2) 
            return Node(arr[0],null,Node(arr[1]))

        if(arr.length===3) 
            return Node(arr[1],Node(arr[0]),Node(arr[2]))
        
        let middle = Math.floor(arr.length / 2);
        root.data = arr[middle];
        //Creates another Tree objects for left and right recursively
        //Then copy its root
        //Maybe is not the best solution, need to research
        root.left = Tree(arr.slice(0,middle)).root
        root.right = Tree(arr.slice(middle+1,arr.length)).root
        return root
    }

    const height = (node) => {
        //Level count from given node to its further leaf node

        let value=0;
        if(!node) 
            return 0;
        let left = height(node.left)
        let right = height(node.right)
        left>right ?
            value=left+1 : value=right+1;
        return value;
    }
    
    const depth = (node,currentNode=root) => {
        //Level count from root to given node

        if(!node||!currentNode)
            return null
        if(node.data==currentNode.data) 
            return 1;
        let found;
        if(currentNode.left)
            found = depth(node,currentNode.left)+1;
        if(!found && currentNode.right)
            found = depth(node,currentNode.right)+1;
        return found;
    }

    const print = (node=root, prefix = '', isLeft = true) => {
        //prints the Tree on CLI in a pretty format

        if (!node) 
            return console.log(null)
        if (node.right)
            print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left)
            print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    const insert = (val, node = root) => {
        //insert value as a leaf node, uses recursion to find best parent node

        if(!node)
            node = Node(val);


        if(node === root && find(val))
            return null

        else if(val < node.data)  
            node.left = insert(val,node.left);

        else if(val > node.data)  
            node.right = insert(val,node.right);
            
        return node;
    }

    const remove = (val, node = root) => {

        if(!node) 
            return null;

        if(node === root && !find(val)) 
            return null

        if(val===node.data){

            if(!node.left && !node.right)
                node = null;

            else if (node.left && !node.right) 
                node = node.left;

            else if (!node.left && node.right)
                node = node.right;

            else if (node.left && node.right){
                let minNode = min(node.right);
                remove(minNode,node);
                node.data = minNode;
            }

        }
        else if(val < node.data)
            node.left = remove(val,node.left);
        else if(val > node.data)
            node.right = remove(val,node.right);
        
        return node;
    }

    const find = (val, node=root) => {
        //returns the node which value is equal to the input 
        //using binary search through bst, returns null if not found

        if(!node) 
            return null;

        if(val === node.data)
            return node;

        if(val < node.data){
            return find(val,node.left);
        }

        return find(val,node.right)
    }

    const min = (node=root) => {
        // returns lower node value

        while(node.left){
            node = node.left;
        }

        return node.data;
    }

    const max = (node=root) => {
        //returns highest node value

        while(node.right){
            node = node.right;
        }

        return node.data;
    }

    const levelOrder = (fn) => {
        //Breadth-first traversal using given function
        //Using Queues

        let queue = [root];
        let arr = []
        while(queue.length){
            let node = queue.shift();
            if(fn) fn(node.data);
            arr.push(node.data);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        if(!fn)
            return arr;
    }

    const inorder = (fn,node=root) => {
        if(!node)
            return;
        let arr=[];
        if(node.left)
            arr.push(...inorder(fn,node.left));
        if (fn)
            fn(node.data);
        arr.push(node.data);
        if(node.right)
            arr.push(...inorder(fn,node.right));
        return arr
    }
    
    const preorder = (fn,node=root) => {
        if(!node) 
            return;
        let arr=[];
        if (fn) 
            fn(node.data);
        arr.push(node.data);
        if(node.left)
            arr.push(...preorder(fn,node.left));
        if(node.right)
            arr.push(...preorder(fn,node.right));
        return arr
    }

    const postorder = (fn,node=root) => {
        if(!node)
            return;
        let arr=[];
        if(node.left)
            arr.push(...postorder(fn,node.left));
        if(node.right)
            arr.push(...postorder(fn,node.right));
        if (fn) 
            fn(node.data);
        arr.push(node.data);
        return arr
    }

    const count = (node = root) => {
        //returns number of nodes in the given node, default is tree root
        return inorder(()=>{},node).length
    }

    const isBalanced = (node=root) => {
        //Check if a given node is balanced
        // by comparing the height of it children nodes
        // stops at first falsy value

        if (!node)
            return true;

        if(Math.abs(height(node.left)-height(node.right)) > 1)
            return false;

        if(!isBalanced(node.left)) 
            return false;
        if(!isBalanced(node.right))
            return false;

        return true;

    }

    const balance = () => {
        // Balances tree using dfs, transforming to sorted array
        //order bst based on the in-order array

        root = build(inorder());
        return root;

    }

    if(Array.isArray(arr))
        root=build(arr)

    return {
        root,
        build,
        height,
        depth,
        print,
        insert,
        remove,
        find,
        min,
        max,
        levelOrder,
        inorder,
        preorder,
        postorder,
        count,
        isBalanced,
        balance,
    }
}

let myTree = Tree(randomArray(1,200,15));
myTree.print();

console.log('Is balanced:',myTree.isBalanced());
console.log('Level Order:',myTree.levelOrder());
console.log('Preorder:',myTree.preorder());
console.log('Postorder:',myTree.postorder());
console.log('Inorder:',myTree.inorder());

for(let i=1;i<200;i++){
    myTree.insert(randomNumber(1,200));
}

myTree.print();
console.log('Is balanced:',myTree.isBalanced());
myTree.balance();
myTree.print();
console.log('Is balanced:',myTree.isBalanced());

console.log('Level Order:',myTree.levelOrder());
console.log('Preorder:',myTree.preorder());
console.log('Postorder:',myTree.postorder());
console.log('Inorder:',myTree.inorder());