'use strict'

// To run this program, you must first install "prompt-sync" from npm

/**
 * A matrix is a mathematical scheme of numbers that is used to concisely represent data.
 *
 * Class Matrix represents a matrix and its methods, the
 * operations that can be performed on a regular matrix.
 */
class Matrix{

    /**
     * @field INVALID_VALUE_MESSAGE
     * represents an error message that is console-logged when an
     * invalid value is inputted by the user at runtime.
     */
    INVALID_VALUE_MESSAGE=
        "---------------\n"+
        "|Invalid Value|\n"+
        "---------------";

    /**
     * The constructor initializes an object of class Matrix, here a parameterized
     * constructor is implemented that takes a matrix as an argument.
     *
     * @param mtx the matrix passed by the user during instantiation
     * @field prompt, represents the node module used to take user inputs via the console.
     * @field matrix, stores the matrix passed as an argument to the constructor.
     * @returns object of the class matrix
     */
    constructor(mtx){

        this.prompt = require("prompt-sync")({ sigint: true });
        let validMatrix = true;

        /**
         * The matrix validation process:
         * Before storing the matrix passed as an argument,
         * the constructor examines the validity of the matrix.
         *
         * This is done to ensure that each row has the same
         * number of elements.
         */
        let firstRow = mtx[0].length ;
        for(let i = 1; i < mtx.length; i++){
            if( mtx [ i ]. length !== firstRow ) validMatrix = false ;
        }

        /**
         * If validated, the matrix is stored and
         * the instance method start() is called.
         * Otherwise, the program is terminated with
         * an error message.
         */
        if( validMatrix ){
            this. matrix = mtx;
            this. start();
        }else{
            console.log(
                "-----------------------\n"+
                "|ERROR! Invalid Matrix|\n"+
                "-----------------------"
            );
        }
    } // End of constructor() method

    /**
     * @method printOptions(),
     * Lists the various operations that can be performed on the matrix.
     *
     * Each operation is associated with a key,
     * which is used to call said operation.
     */
    printOptions() {
        let options =
            "(Options) |         (Functions) \n" +
            "   (0)    ->    Print Matrix \n"+
            "   (1)    ->    Transpose the matrix \n" +
            "   (2)    ->    Modify matrix \n" +
            "   (3)    ->    Add two matrices \n" +
            "   (4)    ->    Subtract two matrices \n" +
            "   (5)    ->    Multiply with another matrix \n" +
            "   (6)    ->    Check if the matrix is symmetric \n" +
            "   (7)    ->    Check if the matrix is skew-symmetric \n" +
            "   (8)    ->    Verify Decomposition Theorem on matrix \n" +
            "   (9)    ->    Obtain Determinant \n" +
            "   (10)   ->    Inverse of matrix \n" +
            "   (11)   ->    Check if the matrix is upper/Lower-Triangular/zero/Diagonal \n" +
            "   (12)   ->    Check if the matrix is a band matrix \n" +
            "   (13)   ->    Check if the matrix is a hollow matrix \n" +
            "   (14)   ->    Check if the matrix is an identity matrix \n" +
            "   (15)   ->    Print Options \n"+
            "   (16)   ->    Exit" ;
        console.log(options) ;
    } // End of printOptions() method


    /**
     * @method start(), called automatically if the input matrix passes the validation process.
     *
     * The method starts an infinite loop that allows the user to consecutively perform
     * different matrix operations. During each iteration, the user is prompted to enter a key.
     * The details about which key fires which function can be seen in the method above.
     *
     * The method has fail-safe measures to prevent the program from crashing in case of
     * invalid input. The user can exit the infinite loop by pressing 16 when asked for input.
     */
    start() {
        this. printOptions();
        let flag = true;
        while(flag){

            /**
             * @method parseInt(),
             * parses the value passed as an argument from type String to Int.
             */

             // "input" stores the parsed form of user input.
             const input = parseInt( this. prompt( "Enter your choice: ")) ;

             /**
             * @method isNaN(), checks if the user input is a numerical value,
             * If the user inputs a non-numerical value, parseInt() returns NaN,
             * which, if left attended can crash the program.
             */
             if( ! isNaN( input ) ){

                /**
                 * Here, the switch statement is used to map user input to its designated function
                 */
                switch(input){
                    case 0:{
                        console.log(this. matrix) ;
                        break ;
                    } case 1:{
                        let transpose = this. transpose() ;
                        console.log(transpose) ;
                        break ;
                    } case 2:{
                        this. modify() ;
                        break ;
                    } case 3:{
                        this. addSubTwoMatrices( 1 ) ;
                        break ;
                    } case 4:{
                        this. addSubTwoMatrices( 2 ) ;
                        break ;
                    } case 5:{
                        this. multiplyTwoMatrices() ;
                        break ;
                    }
                    case 6:{
                        const isSymmetric = this. checkIfMatrixIsSymmetric() ;
                        if( isSymmetric ){
                            console.log(
                                "----------------------\n"+
                                "|Matrix is symmetric!|\n"+
                                "----------------------"
                            ) ;
                        } else{
                            console.log(
                                "--------------------------\n"+
                                "|Matrix is not symmetric!|\n"+
                                "--------------------------"
                            ) ;
                        }
                        break ;
                    } case 7:{
                        const isSkewSymmetric = this. checkIfMatrixIsSkewSymmetric();

                        if( isSkewSymmetric ){
                            console.log(
                                "---------------------------\n"+
                                "|Matrix is Skew-symmetric!|\n"+
                                "---------------------------"
                            );
                        } else{
                            console.log(
                                "-------------------------------\n"+
                                "|Matrix is not Skew-symmetric!|\n"+
                                "-------------------------------"
                            ) ;
                        }
                        break ;
                    } case 8:{
                        const theoremVerified = this. verifyDecompositionTheorem();

                        if( theoremVerified ){
                            console.log(
                                "-------------------------\n"+
                                "|quod erat demonstrandum|\n"+
                                "-------------------------"
                            ) ;
                        }else{
                            console.log(
                                "----------------------------------------\n"+
                                "|Decomposition Theorem is not verified!|\n"+
                                "----------------------------------------"
                            ) ;
                        }
                        break ;
                    } case 9:{
                        this. determinant() ;
                        break ;
                    } case 10:{
                        this. invertTheMatrix() ;
                        break ;
                    } case 11:{
                        const obtained = this. upper_Lower_Zero_DiagonalMatrix()
                        console.log(obtained) ;
                        break;
                    } case 12:{
                        const result = this. bandStructure( this. matrix ) ;
                        if( result ){
                            console.log(
                                "------------------------------\n" +
                                "|Matrix has a Band-Structure!|\n"+
                                "------------------------------"
                            ) ;
                        }else{
                            console.log(
                                "--------------------------------------\n"+
                                "|Matrix doesn't have a Band-Structure!|\n"+
                                "---------------------------------------"
                            ) ;
                        }
                        break ;
                    } case 13:{
                        const result = this. hollowMatrix() ;
                        if( result ){
                            console.log(
                                "-------------------\n" +
                                "|Matrix is Hollow!|\n"+
                                "-------------------"
                            ) ;
                        }else{
                            console.log(
                                "-----------------------\n" +
                                "|Matrix is not Hollow!|\n"+
                                "-----------------------"
                            ) ;
                        }
                        break ;
                    } case 14:{
                        const result = this. identityMatrix() ;
                        if( result ){
                            console.log(
                                "------------------------------\n" +
                                "|Matrix is an Identity-matrix|\n"+
                                "------------------------------"
                            ) ;
                        }else{
                            console.log(
                                "----------------------------------\n" +
                                "|Matrix is not an Identity-matrix|\n"+
                                "----------------------------------"
                            ) ;
                        }
                        break ;
                    } case 15:{
                        this. printOptions() ;
                        break ;
                    } case 16:{

                        /**
                         * if the user enters the value 16 when prompted,
                         * variable flag is falsified and the while loop
                         * is terminated.
                         */
                        flag = false;
                        console.log(
                            "-----------------\n"+
                            "|Enjoy your DAY!|\n"+
                            "-----------------"
                        ) ;
                        break ;
                    } default:{

                        /**
                         * switch-statement reaches "default case" when the user inputs
                         * a value < 0 or > 16
                         */
                        console.log(
                            "----------------------------\n"+
                            "|Invalid Input!, Try Again!|\n"+
                            "----------------------------"
                        ) ;
                        this. printOptions() ;
                        break ;
                    }
                } //end of the switch statement
            }else{

                /**
                 * If the user inputs a non-numerical value, the
                 * following error message is printed.
                 * */
                console.log(
                    "============================\n"+
                    "----------------------------\n"+
                    "|Invalid Input!, Try Again!|\n"+
                    "----------------------------\n"+
                    "| Press 16 to Print Options |\n"+
                    "============================="
                ) ;
            }
        } // End of while-loop
    } // End of start() method


    /**
     * @method transpose(),
     * performs and returns transposition of the original matrix
     * Transposition is the process of swapping rows and columns in a matrix.
     *
     * @returns transposed form of the original matrix.
     */

     transpose(){

         /**
         * We have no special construct in programming to represent a matrix,
         * thus we use arrays to serve our purpose.
         *
         * Each element in the array represent a row of the matrix.
         * Therefore, the length attribute of the array, gives us the number of rows in the matrix.
         *
         * Since each row has the same number of columns in a matrix,
         * we obtain the length of the first row to find the number of columns in the matrix.
         */

         const rows=this. matrix. length;
         const columns=this. matrix[ 0 ] . length;

         /**
         * Rather than altering the original matrix, the method creates a new empty one and
         * fills it with elements from the original matrix in transposed order.
         */
         const transposition = [ ] ;
         for(let i = 0; i < columns; i++){
            transposition[ i ] = [ ] ;
         }

         /**
         * The method implements a nested loop to fill the new (empty) matrix
         * with elements in transposed order. The method reads the elements row-wise
         * in each column from the original matrix and write them column-wise
         * in each row in the new matrix. Thus transposing the matrix.
         */
         let PresentCol = 0;
         while( PresentCol < columns ){
            for(let i = 0; i < rows; i++) {
                transposition [PresentCol][i] = (this.matrix[i][PresentCol]);
            }
            PresentCol++ ;
        }
        return transposition ;
     } // End of transpose() method


    /**
     * @method modify(),
     * modifies the original matrix by changing the value
     * at the intersection of user-specified row and column
     * with user-specified value
     */
     modify(){

         const row = parseInt( this. prompt( "Enter the row index: " ) ) ;
         const column = parseInt( this. prompt( "Enter the column index: " ) ) ;
         const value = parseInt( this. prompt( "Enter the value for this index: " ) ) ;
         /**
         * The flag acts as a safeguard, it is initialized to true,
         * However, if the user inputs an invalid row/column index or an invalid value
         * the flag is falsified thus preventing modifications to the original matrix.
         */
        let flag=true

        /**
         * The conditional checks if the user inputs are valid
         */
        if( isNaN( row ) || row > this. matrix. length || row === 0 ){
            flag = false ;
            console.log(
                "-------------------\n"+
                "|Invalid Row index|\n"+
                "-------------------"
            );
        } else if( isNaN( column ) || column > this. matrix[ 0 ]. length || column === 0 ){
            flag = false ;
             console.log(
                "----------------------\n"+
                "|Invalid Column index|\n"+
                "----------------------"
             ) ;
        } else if( isNaN( value ) ){
            flag = false ;
            console.log( this. INVALID_VALUE_MESSAGE ) ;
        }
        if( ! flag ){
            console.log(
            "-----------------------\n"+
            "|Aborting Modification|\n"+
            "-----------------------"
            ) ;
            return ;
        }
        this. matrix[row - 1][column - 1] = value ;
        console.log( this. matrix ) ;
    }

    /**
     * @method matrixCreator(),
     * creates a new matrix with specified rows and columns
     * and fills it with arguments based on user inputs.
     *
     * @returns matrix, based on user-defined dimensions and values.
     * @param rows
     * @param columns
     */
    matrixCreator( rows, columns ){

        /**
         * The method first creates a matrix with empty rows
         */
        let matrix = [ ] ;
        for(let i = 0; i < rows; i++) matrix[ i ] = [ ] ;

        /**
         * In the following steps, the method fills the rows of the empty matrix with
         * user inputs.
         */
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                const val = parseInt( this. prompt( `Enter value for index [${i+1}][${j+1}]: ` ) ) ;
                if( isNaN( val ) ){

                    /**
                     * If the user enters an invalid value, the process is aborted and the
                     * method returns an empty array.
                     */
                    console.log(this. INVALID_VALUE_MESSAGE) ;
                    return [ ];
                }
                matrix[ i ][ j ] = val ;
            }
        }
        return matrix;
    }




    /**
     * @method addSubTwoMatrices(),
     * used to add or subtract a matrix from the original matrix.
     * To avoid redundant code, we have bundled addition/subtraction into a single method.
     * @param key decides whether addition or subtraction is performed
     */
    addSubTwoMatrices( key ){

        /**
         * Addition/Subtraction btw two matrices is only possible if they both have
         * the same dimensions, therefore we hardcode the method matrixCreator to
         * generate a matrix of dimensions equivalent to the original matrix.
         */
        const tempArray = this. matrixCreator( this.matrix.length, this. matrix[0].length) ;
        if( tempArray.length === 0 ){
            console.log(
                "--------------------\n" +
                "|Operation Aborted!|\n" +
                "--------------------"
            ) ;
        }else{
            console.log( tempArray ) ;
            let modifyTheOriginalMatrix ;

            /**
             * if the key == 1, the addition operation is performed, and subtraction otherwise.
             * In both cases, the user is prompted to choose if they wish to make the original
             * matrix equivalent to the result of addition/subtraction.
             */

            /**
             * the method internally makes use of
             * @method addTwoMatrices() for addition,
             * @method subTwoMatrices() for subtraction.
             *
             * Both addTwoMatrices() and subTwoMatrices() are declared as independent
             * methods to avoid redundant code and enhance re-usability.
             */

             if(key === 1){
                 modifyTheOriginalMatrix = this.prompt("ADD and MODIFY original matrix (y/n): ")
                 this.addTwoMatrices(tempArray, this.matrix);
                 console.log(`This addition of matrices gives us:`);
             }
             else{
                 modifyTheOriginalMatrix=this.prompt("SUB and MODIFY original matrix (y/n): ")
                 this.subTwoMatrices(tempArray, this.matrix);
                 console.log(`This Subtraction of matrices gives us:`);
             }
            console.log(tempArray);
             if(modifyTheOriginalMatrix === "y"){
                this.matrix = tempArray;
            }
        }// End of if-else conditional

    } // End of addSubTwoMatrices() method

    /**
     * @method addTwoMatrices(),
     * takes two matrices as arguments and adds the elements of the
     * second argument matrix to the first. The method stores the result elementwise
     * in the first matrix and returns it.
     *
     * @param matrix1 the first matrix
     * @param matrix2 the second matrix
     * @return matrix1
     **/
    addTwoMatrices(matrix1, matrix2){
        for(let i = 0; i < matrix2.length; i++){
            for(let j = 0; j < matrix2[0].length; j++){
                matrix1[ i ][ j ] = matrix1[ i ][ j ] + matrix2[ i ][ j ] ;
            }
        }
        return matrix1 ;
    }

    /**
     * @method subTwoMatrices,
     * takes two matrices as arguments and subtracts elements of
     * the first matrix from the second. The method stores the result elementwise
     * in the first matrix and returns it.
     *
     * @param matrix1 the first matrix
     * @param matrix2 the second matrix
     * @return matrix1
     */
    subTwoMatrices(matrix1, matrix2){
        for(let i = 0; i < matrix2.length; i++){
            for(let j = 0; j < matrix2[0].length; j++){
                matrix1[ i ][ j ] = matrix2[ i ][ j ] - matrix1[ i ][ j ] ;
            }
        }
        return matrix1;
    }

    /**
     * @method multiplyTwoMatrices(),
     * multiplies the original matrix with a user-defined matrix from RHS
     *
     * MATRIX MULTIPLICATION RULE:
     * For two matrices to be multiplied, the number of columns in the first matrix
     * must be equivalent to the number of rows in the second matrix.
     *
     * To begin with the user is prompted to enter the dimensions of the new matrix.
     * If the dimensions validate the matrix multiplication rule,
     * The dimensions are passed to method matrixCreator() and a matrix based on
     * user-inputs is created.
     *
     * To multiply the matrices, we use a cubic algorithm,
     * We start at the first row and iteratively perform
     * scalar multiplication between i-th rows of the first matrix
     * and j-th columns of the second matrix. The results are
     * stored at index [ i ][ j ] in the dummy matrix created beforehand
     * to store results.
     *
     * Once scalar multiplication is performed btw corresponding rows and columns,
     * The dummy matrix with multiplication results is console logged.
     */
    multiplyTwoMatrices(){
        const NumberOfRows=parseInt(this.prompt("Enter the number of rows: "));
        const NumberOfColumns=parseInt(this.prompt("Enter the number of columns: "));
        if( isNaN( NumberOfRows ) || isNaN( NumberOfColumns )){
            console.log(this.INVALID_VALUE_MESSAGE);
            return;
        }

        if(NumberOfRows !== this.matrix[ 0 ].length){
            console.log(
                "--------------------------------\n"+
                "|  Invalid Dimensions!         |\n"+
                "|Multiplication is not Possible|\n"+
                "--------------------------------"
                ) ;
            return ;
        }
        let newMatrix = this.matrixCreator(NumberOfRows, NumberOfColumns);
        if( newMatrix.length !== 0 ){
            console.log(newMatrix);

            /** Creation of dummy matrix */
            let multiplicationResult = [ ];
            for(let i = 0; i < this.matrix.length; i++){
                multiplicationResult[ i ]= [];
            }

            /** Multiplication of matrices */
            for(let i=0;i<this.matrix.length;i++){
                let scalarProduct=0;
                for(let j=0;j<NumberOfColumns;j++){
                    for(let k = 0; k < NumberOfRows; k++){
                        scalarProduct+=this.matrix[ i ][ k ] * newMatrix[ k ][ j ];
                    }
                    multiplicationResult[ i ][ j ] = scalarProduct;
                    scalarProduct = 0
                }
            }
            console.log(`The multiplications of matrices gives us: `);
            console.log(multiplicationResult);

        }else{
            console.log(
                "------------------------\n"+
                "|Multiplication aborted|\n"+
                "-----------------------"
            );
        }

    }// End of multiplyTwoMatrices() method

    /**
     * @method checkIfMatrixIsSymmetric(),
     * checks whether the original matrix is symmetric or not. A symmetric matrix
     * is square and its transposition results in the same matrix with no changes.
     * The method first checks if the matrix is square and then iteratively compares elements
     * at the intersection of row "i" and column "j" with elements at column "i" and row "j"
     *
     * @return true, if the matrix is symmetric and false otherwise.
     **/
    checkIfMatrixIsSymmetric(){
        if( this.matrix[0].length !== this.matrix.length)return false;
        for( let i = 0; i < this.matrix.length; i++){
            for( let j = 0; j < this.matrix[0].length; j++){
                if( i === j ) continue ;
                if( this.matrix[ i ][ j ] !== this.matrix[ j ][ i ]) return false ;
            }
        }
        return true;
    }

    /**
     * @method checkIfMatrixIsSkewSymmetric(),
     * checks whether the original matrix is skew-symmetric or not.
     * A skew-symmetric matrix has, for each element at the intersection
     * of row "i" and column "j", an element at the intersection
     * of row "j" and column "i", which is equal in value and has the opposite sign.
     *
     * @returns true, if the matrix is skew-symmetric and false otherwise
     */
    checkIfMatrixIsSkewSymmetric(){
        if( this.matrix[0].length !== this.matrix.length) return false ;
        for( let i = 0; i < this.matrix.length; i++){
            for( let j = 0; j < this.matrix[0].length; j++){
                if( i === j ) continue ;
                if( this.matrix[ i ][ j ] !== - this.matrix[ j ][ i ]) return false;
            }
        }
        return true;
    }


    /**
     * DECOMPOSITION THEOREM:
     * The theorem states that a square matrix A can be represented as
     * The sum of symmetric matrix B and skew-symmetric matrix C,
     *
     * @method verifyDecompositionTheorem(),
     * verifies the decomposition theorem, to verify the decomposition theorem, we need:
     * 1. Symmetric Matrix, B = 1/2 * (A + A^T) .
     * 2. Skew-Symmetric Matrix, C = 1/2 * (A - A^T) .
     *
     * The method first creates (A + A^T). The transpose of matrix A is obtained using
     * method transpose(), this transposed matrix is added to the original matrix using
     * method addTwoMatrices() method
     *
     * Similarly, (A - A^T) is created using methods transpose() and subTwoMatrices(),
     *
     * The method then uses nested for-loops to multiply each element of the matrix
     * ( A + A^T ) and ( A - A^T )with 1/2. The result of this creates the required
     * symmetric and skew-symmetric matrices, which are added using the method
     * addTwoMatrices().
     *
     * Finally, a nested for loop is used to check whether the result of the matrix obtained from
     * 1/2 * (A + A^T^) + 1/2 * (A - A^T^) matches with A
     *
     * @returns true, if the theorem is verified and false otherwise.
     * */
    verifyDecompositionTheorem(){
        if( this.matrix[ 0 ].length !== this.matrix.length ) return false;
        /** Creating (A + A^T) */
        let addTwoMatrices = this.addTwoMatrices(this.transpose(), this.matrix);

        /** Creating (A - A^T) */
        let subTwoMatrices = this.subTwoMatrices(this.transpose(), this.matrix);

        /** Multiplying each element of (A + A^T) and (A - A^T) with 1/2 */
        for(let i = 0; i < addTwoMatrices.length; i++){
            for(let j = 0; j < addTwoMatrices[0].length; j++){
                addTwoMatrices[ i ][ j ] *= (0.5);
                subTwoMatrices[ i ][ j ] *= (0.5);
            }
        }

        console.log("The symmetric matrix B: ");
        console.log(addTwoMatrices);
        console.log("The skew-symmetric matrix C: ");
        console.log(subTwoMatrices);

        /** Adding 1/2*(A + A^T) and 1/2*(A - A^T) */
        this.addTwoMatrices( addTwoMatrices, subTwoMatrices );

        /** Verification Step */
        for( let i = 0; i < this.matrix.length; i++){
            for( let j = 0; j < this.matrix[ 0 ].length; j++){
                if(addTwoMatrices[ i ][ j ] !== this.matrix[ i ][ j ]) return false;
            }
        }
        return true;
    } // End of verifyDecompositionTheorem() method

    /**
     * @method determinant(),
     * used to calculate the determinant of a matrix using the co-factor expansion method.
     *
     * Determinant can only be calculated for square matrices. Therefore, in the
     * first step, we check if the matrix is square. If not an error message is returned.
     * Next, we check if we have a 1X1 matrix, if so the determinant is the first element itself.
     * In the else block, we use a method named solveMatrix() which recursively calculates
     * the determinant using the co-factor expansion method.
     */
    determinant(){

        if( this.matrix.length !== this.matrix[0].length ){
            console.log(
                "--------------------------\n"+
                "Determinant is not-defined\n"+
                "----------------------------"
            );
        }else if( this.matrix.length === 1 ){
            console.log(
                "---------------------------------------------\n"+
                `|Determinant is ${ this.matrix[0][0] } units|\n`+
                "---------------------------------------------"
            );
        }else{
            const val = this.solveMatrix( this.matrix ) ;
            console.log(
                "-----------------------------\n"+
                `|Determinant is ${val} units|\n`+
                "-----------------------------"
            );
        }
    } // End of determinant() method

    /**
     * @method solveMatrix(),
     * takes a matrix as an argument and calculates its determinant using co-factor
     * expansion method along the first row of the matrix. The method runs recursively,
     * In the base case of the method, we check if we have a 2X2 matrix, If so, the recursion
     * stops and the determinant is directly calculated and returned. In the induction step,
     * we go along the first row and recursively form smaller matrices for each row element
     * until we have a 2X2 matrix, at which point we calculate the determinant of the
     * sub-matrix and add the result to the variable "determinant".
     *
     * @param matrix the matrix of which we want to calculate the determinant
     * @returns determinant of the argument matrix
     */
    solveMatrix( matrix ){
        let determinant = 0;
        if(matrix.length === 2){ //Base Case
            return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
        }else{
            // Induction Step
            // As you can see from the outermost loop,
            //We only go along the first row, for each matrix.
            for(let i = 0; i < 1; i++){
                for(let j = 0; j < matrix[ 0 ].length; j++){
                    let topVal = matrix[ i ][ j ] ;

                    /** TopVal is an element of the first row, which is positive if
                     * column index is odd and negative otherwise */
                    if( j%2 !== 0 ){
                        topVal = -matrix[ i ][ j ];
                    }

                    /** Creation of empty matrix */
                    let tempMatrix = [ ];
                    let counter = 0
                    for(let k = i+1; k < matrix.length; k++){
                        tempMatrix[counter]=[ ];
                        counter++ ;
                    }

                    /** filling the empty matrix with elements from rows below the
                     * first row and from columns except for the one in which "TopVal" belongs */
                    counter = 0
                    for(let k=i+1; k <matrix.length; k++){
                        let subCounter = 0;
                        let z = 0
                        while( z < matrix[0].length ){
                            if(z === j){
                                z++ ;
                                continue;
                            }
                            tempMatrix[ counter ][ subCounter ] = matrix[ k ][ z ];
                            subCounter++;
                            z++;
                        }
                        counter++ ;
                    }

                    /** Recursive step */
                    const value = this.solveMatrix( tempMatrix );
                    determinant += topVal*value;
                }
            }
        }
        return determinant;

    } //End of solveMatrix() method

    /**
     * @method invertTheMatrix(),
     * checks and calculate the inverse of a matrix. The method starts by checking
     * if the matrix is square. If so, The method checks if the matrix has dimension 1X1,
     * if so, the inverse is calculated accordingly, If not, the method uses the method
     * upper_Lower_Zero_DiagonalMatrix(), to check if
     * the matrix is diagonal, if so the inverse is calculated accordingly.
     * If not, the method checks if the determinant of the matrix is non-zero,
     * If not, the matrix is non-invertible, else the method creates a duplicate of the
     * original matrix and then uses the method calculateInverse(),
     * to calculate the inverse of the matrix.
     */
    invertTheMatrix(){

        /** checking if the matrix is square*/
        if( this.matrix.length !== this.matrix[0].length ){
            console.log(
                "---------------------------\n" +
                "|Matrix is not Invertible!|\n"+
                "---------------------------"
            );
        }else if( this.matrix.length === 1 ){
            /** Checking if the matrix has dimension 1X1*/
            if( this.matrix[0][0] !== 0 ){
                console.log(`The inverse of matrix is ${1/this.matrix[0][0]}`)
            }else{
                console.log(
                    "---------------------------\n" +
                    "|Matrix is not Invertible!|\n"+
                    "---------------------------"
                );
            }
        }else if( this.upper_Lower_Zero_DiagonalMatrix() ["is the Matrix a Diagonal-matrix "] ){

            //checking if the matrix is diagonal
            let inverse = [ ];
            for(let i = 0; i < this.matrix.length ; i++){
                const val = parseFloat( (1/this.matrix[ i ][ i ]).toFixed(4) )
                inverse.push( val );
            }
            console.log("The inverse of matrix is: ")
            console.log(inverse);
        }else{

            /** Finally we check if the matrix has a non-zero determinant and
             * if it does, we apply the Gaussian algorithm */

            if(this.solveMatrix( this.matrix ) !== 0){
                let duplicateOriginalMatrix = [ ];
                for(let i = 0; i < this.matrix.length; i++){
                    duplicateOriginalMatrix[ i ] = [ ];
                }
                for(let i = 0; i < this.matrix.length; i++){
                    for(let j = 0; j < this.matrix[0].length; j++){
                        duplicateOriginalMatrix[ i ][ j ] = this.matrix[ i ][ j ];
                    }
                }
                const inverse = this.calculateInverse(this.matrix);
                this.matrix = duplicateOriginalMatrix;
                console.log("The inverse of matrix is: ")
                console.log(inverse);
            }else{
                console.log(
                    "---------------------------\n" +
                    "|Matrix is not Invertible!|\n"+
                    "---------------------------"
                );
            }
        }
    } //End of invertTheMatrix() method

    /**
     * @method calculateInverse(),
     * calculates the inverse of the argument matrix using the Gaussian algorithm.
     * Gaussian algorithm uses elementary row operations to calculate the inverse of a matrix.
     *
     * @param matrix the matrix for which the method calculates the inverse.
     * @returns the inverse of the argument matrix.
     **/
    calculateInverse(matrix){

        /** In the following steps the method creates an identity
         * matrix of the same dimension as the argument matrix. */
        let inverse=[ ];
        for(let i = 0; i < matrix.length; i++){
            inverse[ i ] = [ ];
        }
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[0].length; j++){
                if(i === j) inverse[ i ][ j ] = 1;
                else inverse[ i ][ j ] = 0;
            }
        }

        /**
         * In the following steps the method treats the argument matrix as an augmented matrix,
         * performing elementary row operations on both the argument and identity matrix.
         * The method iteratively goes through each column and performs elementary
         * row operations on it, Thus converting the left-hand side of augmented
         * matrix(argument matrix) into an identity matrix and the right-hand side
         * of augmented matrix(identity matrix) into the inverse matrix.
         */
        for(let i = 0; i < matrix[0].length; i++){

            /** The flag remains true till the diagonal element
             *  of the i^th column becomes 1 and the rest 0. */
            let flag = true;
            while( flag ){
                /** In the first step the method checks if the diagonal element of current
                 * column is zero, if it is, the rows are interchanged till it becomes non-zero. */
                if(matrix[ i ][ i ] === 0){
                    for(let j = 0; j < matrix.length ; j++){
                        if(matrix[ j ][ i ] !== 0){
                            let tempRow = matrix[ j ];
                            matrix[ j ] = matrix[ i ];
                            matrix[ i ] = tempRow;
                        }
                    }
                }

                /**
                 * Then the method checks if the diagonal element of the current column is equal
                 * to 1. If it isn't, all elements along the row "i" of the augmented matrix,
                 * are divided by a value so that it turns into 1.
                 **/
                if(matrix[ i ][ i ] !== 1){
                    const val = matrix[ i ][ i ];
                    for(let j = 0; j < matrix[0].length; j++){
                        matrix[ i ][ j ] /= val;
                        inverse[ i ][ j ] /= val;
                    }
                }

                /**
                 * Then the method converts all elements above and below the diagonal element
                 * in the current column to zero by subtracting from them and the row in which they
                 * belong, elements of the i-th row apt. amount of times.
                 */
                for(let j = 0; j < matrix.length; j++){
                    if( j === i ) continue;
                    else if( matrix[ j ][ i ] !== 0 ){
                        const val = matrix[ j ][ i ]
                        for(let l = 0; l < matrix[0].length; l++){
                            matrix[ j ][ l ] -= val * matrix[ i ][ l ];
                            inverse[ j ][ l ] -= val * inverse[ i ][ l ];
                        }
                    }
                }

                /**
                 * At last the method checks if all elements except the diagonal element in the
                 * current column has been turned into zeros, if so the flag is falsified,
                 * and we move on to the next column.
                 */
                if( matrix[ i ][ i ] === 1 ){
                    let exitCol = true;
                    for(let j = 0; j < matrix.length; j++){
                        if( j === i ) continue;
                        else if( matrix[ j ][ i ] !== 0) exitCol = false;
                    }
                    if( exitCol ){
                        flag = false;
                    }
                }
            }
        }

        /**
         * The following steps are to reduce the precision of the elements in the
         * inverse matrix
         */
        for(let  i = 0; i < inverse.length; i++){
            for(let j = 0; j < inverse[0].length; j++){
                inverse[ i ][ j ] = parseFloat( inverse[ i ][ j ].toFixed(4));
            }
        }
        return inverse;
    } // End of calculateInverse() method

    /**
     * @method upper_Lower_Zero_DiagonalMatrix(),
     * iterates through each element of the matrix and checks if they
     * satisfy any of the following conditions, if they do the corresponding flag is falsified
     *
     * 1. if the matrix contains a single non-zero value, "flagForZeroMatrix" is falsified
     * 2. if there are non-zero values at the intersection row "i" and column "j", where i != j,
     *   "flagForDiagonalMatrix" is falsified
     * 3. if there is a non-zero element at the intersection of row "i" and column "j", where j > i,
     *   "flagForLowerTriangular" is falsified, since there are elements in the upper half as well
     * 4. finally, if there is a non-zero element at the intersection of row "i" and column "j",
     *   where i > j, the "flagForUpperTriangular" is falsified, since there are non-zero elements
     *   in the lower half of the matrix.
     *
     * The method returns an object which specifies in terms of a boolean value, whether our
     * matrix is lower-triangular, upper-triangular, zero, and diagonal.
     */
    upper_Lower_Zero_DiagonalMatrix(){
        let flagForZeroMatrix = true;
        let flagForDiagonalMatrix = true;
        let flagForUpperTriangular = true;
        let flagForLowerTriangular = true;
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                if( this.matrix[ i ][ j ] !== 0 ){ // checking for zero matrix
                    flagForZeroMatrix = false;
                }
                if( i !== j && this.matrix[ i ][ j ] !== 0 ){ // checking for Diagonal matrix
                    flagForDiagonalMatrix = false;
                }
                if( i > j && this.matrix[ i ][ j ] !== 0 ){ // checking for UpperTriangular matrix
                    flagForUpperTriangular = false;
                }
                if( j > i && this.matrix[ i ][ j ] !== 0 ){ // checking for LowerTriangular matrix
                    flagForLowerTriangular = false;
                }
            }
        }

        return {
            "is the Matrix Lower-Triangular matrix ": flagForLowerTriangular,
            "is the Matrix UpperTriangular matrix ": flagForUpperTriangular,
            "is the Matrix a zero-matrix ": flagForZeroMatrix,
            "is the Matrix a Diagonal-matrix ": flagForDiagonalMatrix
        }
    } // End of upper_Lower_Zero_DiagonalMatrix() method

    /**
     * @method bandStructure(),
     * checks if our matrix has a band structure. To do so the method iterates
     * through the matrix and checks if there are any non-zero elements outside the
     * vicinity of the main diagonal, i.e., at the intersection of i-th row and j-th column, where
     * column j is an element ahead or behind the main diagonal.
     * @param matrix, the matrix which we examine for band-structure
     * @return true if the argument matrix has a band structure and false otherwise.
     */
    bandStructure(matrix){
        let DoesMatrixHaveABandStructure = true;
        for(let i = 0; i< matrix.length; i++){
            for(let j = 0; j < matrix[0].length; j++){
                if( j >= i + 2 || j <= i - 2){
                    if(matrix[ i ][ j ] !== 0){
                        DoesMatrixHaveABandStructure = false;
                        break;
                    }
                }
            }
        }
        return DoesMatrixHaveABandStructure;
    } // End of bandStructure() method

    /**
     * @method hollowMatrix(),
     * checks if our matrix has zeroes along the main diagonal,
     * The method iterates through the matrix and checks each element at the intersection
     * of the i-th row and j-th column where the value of "i" is equal to "j".
     * If the element is non-zero, the method returns false.
     *
     * @returns true if the matrix is hollow and false otherwise.
     */
    hollowMatrix(){
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                if( i === j && this.matrix[ i ][ j ] !== 0) return false;
            }
        }
        return true;
    } // End of hollowMatrix() method

    /**
     * @method identityMatrix()
     * checks if the matrix is an identity matrix, first it checks if our matrix
     * is square, if so it iterates through the matrix and checks if there are non-zero
     * elements at the intersection i-th row and j-th column where i != j, if so the method
     * returns false, else for each element at the intersection of the i-th row and j-th column
     * where i == j and the element is not equal to one, the method adds the element to an
     * array called record. If the length of the record is 0, the method returns true, else if
     * The length > 0 and < r, where r is the number of rows in the matrix, the method returns
     * false, else the method iterates through the record, if all values of the record are equal to
     * some value "x", The method returns true and false otherwise
     *
     * @returns true if the matrix is an identity matrix and false otherwise.
     */
    identityMatrix(){
        if(this.matrix.length !== this.matrix[ 0 ].length) return false;
        let record=[ ];
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[0].length; j++){
                if( i !== j && this.matrix[ i ][ j ] !== 0 ) return false;
                if(i === j && this.matrix[ i ][ j ] !== 1) record.push( this.matrix[ i ][ j ] );
            }
        }
        if( record.length === 0 ) return true;
        else if( record.length !== this.matrix.length ) return false;
        else{
            let prev = record[ 0 ];
            for(let i = 1; i < record.length; i++){
                if( record[ i ] !== prev ) return false;
            }
        }
        return true;
    } // End of identityMatrix() method

} // End of class Matrix


/**
 *  Test case, an object of class Matrix is assigned to a constant named "matrix".
 */
const matrix=new Matrix(
    [
            [98,89,34,21,33,45],
            [21,2,23,24,5,90],
            [1,12,1,14,15,33],
            [23,45,67,8,100,67],
            [31,3,33,34,35,11]
        ]);




