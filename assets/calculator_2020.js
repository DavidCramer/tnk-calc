/////////////////////////////////////
//ADDITIONAL COSTS VARIABLES : 2020//
/////////////////////////////////////

// Must be declared outside function to allow them to be pulled into html

//Additional Transfer Costs variables for easy adding
var RatesClearanceCert = 855.00;
var PostPetties = 650.00; // Used twice
var LevyClearanceSectTitle = 1200.00;
var ElecDocFeeTrans = 800.00; // Used twice
var FICACompliance = 450.00;
var ElecDeedsOfficeSearch = 575.00; // Used twice
// STEP 00: DONE

// Additional Bond Costs variables for easy adding
var BankInitFee = 6037.50;
var InsCertSectTitle = 600.00;
var BodyCorpFinState = 550.00;
var ElecDocFeeBond = 1150.00; // Used twice
// STEP 0: DONE

////////////////

if ( typeof jQuery == 'undefined' ) {
    alert( 'jQuery library is not found!' );
} else {

    $( document ).ready( function() {
        load_div( '#calc-entry-page' );

        $('#show-bond').on('change', function(){
            if( this.checked ) {
                $( '#bond-wrapper' ).show();
                if( ! $( '#bond-value' ).val().length ){
                    $( '#bond-value' ).val( $( '#prop-value' ).val() )
                }
            }else{
                $( '#bond-wrapper' ).hide();
            }
        });

        $( '#close-link' ).click( function() {
            $( location ).attr( 'href', 'http://www.tnk.co.za' );
        } );
        $( '#print-button' ).click( function() {
            window.print();
        } );

        $( '#whats-this-transfer' ).hover(
            function() {
                $( '#additional-transfer-costs' ).show();
            }, function() {
                $( '#additional-transfer-costs' ).hide();
                return false;
            },
        );

        $( '#whats-this-bond' ).hover(
            function() {
                $( '#additional-bond-costs' ).show();
            }, function() {
                $( '#additional-bond-costs' ).hide();
                return false;
            },
        );

        $( '#calc-msg-close' ).click( function() {
            $( '#calc-messages' ).hide();
        } );

        $( '#calc-reset' ).click( function() {
            //$('body').css('background-image','url("images/homeback.jpg")');
            $( '#prop-value' ).prop( 'disabled', false );
            $( '#bond-value' ).prop( 'disabled', false );

            //console.log('tedt');
            $( '#calc-messages' ).hide();
            $( '#calc-reset' ).hide();
            $( '#prop-value' ).val( '' );
            $( '#bond-value' ).val( '' );
            load_div( '#calc-entry-page' );

            $( '#calc-click' ).show();

            ///////////////////////
            //Reset Validation
            var form = document.getElementById( 'form-validation' );
            form.classList.remove( 'was-validated' );
            ///////////////////////

        } );





        $( '#prop-value,#bond-value' ).on( 'input change', function( ev ) {
            var form = document.getElementById( 'form-validation' );
            if( parseInt(  $( '#prop-value' ).val() ) <= 500000 ){
                $( '#calc-result-page' ).hide();
                form.classList.remove( 'was-validated' );
                return;
            }
            //$('body').css('background-image','url("images/resultsback.jpg")');
            $( '#calc-messages' ).hide();

            // Custom Valudation by copying form validation jQuery -
            // https://www.w3schools.com/js/js_validation_api.asp
            // ///////////////////// Fetch all the forms we want to apply
            // custom Bootstrap validation styles to, removing reliance on
            // submit event here so there is no conflict.

            if ( form.checkValidity() === false  ) {
                $( '#calc-result-page' ).hide();
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add( 'was-validated' );
            ///////////////////////

            // Normal Process
            var prop_value = parseFloat( $( '#prop-value' ).val() );
            var bond_value = parseFloat( $( '#bond-value' ).val() );

            var snakeville = typeof ( prop_value );
            var snakeville2 = typeof ( bond_value );
            //console.log('Prop val - '+prop_value);
            //console.log('Bond val - '+bond_value);
            if ( isNaN( prop_value ) || prop_value == '0' || prop_value < 1 ) {
                $( '#calc-reset' ).show();

                //alert('Please only enter a valid \'Property Value\' from 0 -
                // 15000000');

                $( '#calc-msg-html' ).html( '<strong>Error: </strong> Please only enter a \'Property Price\' between 500000 & 15000000' );
                $( '#calc-messages' ).removeClass( 'alert alert-info alert-warning alert-success alert-dismissible' ).addClass( 'alert alert-warning alert-dismissible' );
                $( '#calc-messages' ).show();

            } else if ( prop_value > 15000000 ) {
                $( '#calc-reset' ).show();

                //alert('The value you entered is over 15 million. Please call
                // or email us for a tailormade proposal. You will be shown our
                // contact page after clicking ok.');
                // window.open('http://www.tnk.co.za/contact-us/');
                $( '#calc-msg-html' ).html( '<strong>Contact us: </strong> The \'Property Price\' you entered is over 15 million. Please call or email us for a tailormade proposal. <div class=\'text-center py-3\'><button class="btn btn-primary btn-sm" type="button" onclick="window.open(\'http://www.tnk.co.za/contact-us/\')">Here are our Contact Details</button></div> ' );
                $( '#calc-messages' ).removeClass( 'alert alert-info alert-warning alert-success alert-dismissible' ).addClass( 'alert alert-info alert-dismissible' );
                $( '#calc-messages' ).show();

            } else if ( prop_value < 500000 ) {


            } else {

                if ( isNaN( bond_value ) || bond_value == '0' || bond_value < 1 ) {
                    var results = calculate_costs( prop_value );
                    //no bond amt entered
                    var transfer_fee = dress_to_money( results[ 0 ] );
                    var transfer_fee_tax = dress_to_money( results[ 1 ] );
                    var transfer_deeds_office_fee = dress_to_money( results[ 2 ] );
                    var transfer_duty = dress_to_money( results[ 3 ] );
                    var transfer_total = dress_to_money( results[ 4 ] );
                    var bond_fee = dress_to_money( results[ 5 ] );
                    var bond_fee_tax = dress_to_money( results[ 6 ] );
                    var bond_deeds_office_fee = dress_to_money( results[ 7 ] );
                    var bond_total = dress_to_money( results[ 8 ] );
                    var pnp = dress_to_money( results[ 9 ] );
                    var additonal_bond_costs = dress_to_money( results[ 10 ] );
                    var additional_transfer_costs = dress_to_money( results[ 11 ] );

                    var bond_value = prop_value; // Make Bond Value equal to
                                                 // Prop Value if not entered -
                                                 // Neil

                } else {
                    //different bond amount entered
                    var results = calculate_costs( prop_value );
                    var results2 = calculate_costs( bond_value );

                    var transfer_fee = dress_to_money( results[ 0 ] );
                    var transfer_fee_tax = dress_to_money( results[ 1 ] );
                    var transfer_deeds_office_fee = dress_to_money( results[ 2 ] );
                    var transfer_duty = dress_to_money( results[ 3 ] );
                    var transfer_total = dress_to_money( results[ 4 ] );

                    var bond_fee = dress_to_money( results2[ 5 ] );
                    var bond_fee_tax = dress_to_money( results2[ 6 ] );
                    var bond_deeds_office_fee = dress_to_money( results2[ 7 ] );
                    var bond_total = dress_to_money( results2[ 8 ] );
                    var pnp = dress_to_money( results2[ 9 ] );
                    var additonal_bond_costs = dress_to_money( results2[ 10 ] );

                    var additional_transfer_costs = dress_to_money( results[ 11 ] );
                }

                $( '#calc-click' ).hide();
                //$("#prop-value").prop('disabled', true);
                //$("#bond-value").prop('disabled', true);
                //console.log("Button Clicked val - "+prop_value);

                $( '#calc-purchase-price' ).html( prop_value );
                $( '#calc-bond-value' ).html( bond_value );

                $( '#calc-transfer-cost' ).html( transfer_fee );
                $( '#calc-transfer-vat' ).html( transfer_fee_tax );
                $( '#calc-transfer-pnp' ).html( pnp );
                $( '#calc-transfer-other' ).html( additional_transfer_costs );
                $( '#calc-transfer-deeds' ).html( transfer_deeds_office_fee );
                $( '#calc-transfer-total' ).html( transfer_total );
                $( '#calc-transfer-duty' ).html( transfer_duty );

                $( '#calc-bond-cost' ).html( bond_fee );
                $( '#calc-bond-vat' ).html( bond_fee_tax );
                $( '#calc-bond-pnp' ).html( pnp );
                $( '#calc-bond-other' ).html( additonal_bond_costs );
                $( '#calc-bond-deeds' ).html( bond_deeds_office_fee );
                $( '#calc-bond-total' ).html( bond_total );

                $( '#calc-result-page' ).show();
                //$('#calc-reset').show();
                //$('#calc-enter-values').hide();

            }

            //console.log(results);
            //populate_results($results);
            //load_div('#calc-result-page');
        } );

    } );

    function load_div_loader( page ) //Not working properly
    {
        $( '#calc-main-content' ).fadeOut( 500, function() {
            $( '.page' ).hide();
            $( page ).show();
        } ).fadeIn( 500, function() {var snake = '';} );
    }

    function load_div( page ) //Not working properly
    {
        $( page ).show();
    }

    function dress_to_money( num ) {
        var currency_symbol = 'R';
        typeof ( amount ) == 'number' ? null : typeof ( amount ) == 'string' ? amount = parseFloat( amount ) : null;
        var currency_string = num.toCurrency( {
            'thousands_separator': ',',
            'currency_symbol': currency_symbol,
            'symbol_position': 'front',
            'use_fractions': { 'fractions': 2, 'fraction_separator': '.' },
        } ); // 12345.6789 should return $12,345.68
        return currency_string;
    }

    function calculate_costs( property_price ) {

        ////////////////////
        //ADDITIONAL COSTS//
        ////////////////////

        // Guideline: Taken from Hard entered values in Spreadsheet Table,
        // 'Additional' sheet Update twice at top of this page and top of html
        // page STEP 1: DONE Actual Calculations start here...

        var additional_transfer_costs = RatesClearanceCert + LevyClearanceSectTitle + ElecDocFeeTrans + FICACompliance + ElecDeedsOfficeSearch;
        //additional_transfer_costs =
        // Number.parseFloat(additional_transfer_costs).toFixed(2);
        // console.log("additional_transfer_costs:"+additional_transfer_costs);

        var additional_bond_costs = BankInitFee + InsCertSectTitle + BodyCorpFinState + ElecDeedsOfficeSearch + ElecDocFeeBond;
        //additional_bond_costs =
        // Number.parseFloat(additional_bond_costs).toFixed(2);
        // console.log("additional_bond_costs:"+additional_bond_costs);

        var pnp = PostPetties; // Same same, inserted further below

        var transfer_fee = 0;
        var bond_fee = 0;
        var transfer_deeds_office_fee = 0;
        var bond_deeds_office_fee = 0;
        var transfer_duty = 0;

        ////////////////////////////////////////
        // SCHEDULED BOND FEE & TRANSFER FEE  //
        //               AKA                  //
        // CONVEYANCOR FEE GUIDELINES FORMULA //
        ////////////////////////////////////////

        // 2020 Schedule - COLUMN A AND COLUMN B, see
        // https://trello.com/c/42ygFUgQ -> Official Document should be provied
        // for this. STEP 2: DONE

        if ( property_price <= 100000 ) // ROW 1
        {
            cl1_2 = 5200;
            bond_fee = cl1_2;
            transfer_fee = bond_fee;
        } else if ( property_price > 100000 && property_price <= 500000 ) // ROW 2
        {
            intial = Math.ceil( ( ( property_price - 100000 ) / 50000 ) );
            cl1_2 = 5200 + ( intial * 800 );
            bond_fee = cl1_2;
            transfer_fee = bond_fee;
        } else if ( property_price > 500000 && property_price <= 1000000 ) // ROW 3
        {
            intial = Math.ceil( ( ( property_price - 500000 ) / 100000 ) );
            cl1_2 = 11600 + ( intial * 1600 );
            bond_fee = cl1_2;
            transfer_fee = bond_fee;
        } else if ( property_price > 1000000 && property_price <= 5000000 ) // ROW 4
        {
            intial = Math.ceil( ( ( property_price - 1000000 ) / 200000 ) );
            cl1_2 = 19600 + ( intial * 1600 );
            bond_fee = cl1_2;
            transfer_fee = bond_fee;
        } else if ( property_price > 5000000 ) // ROW 5
        {
            intial = Math.ceil( ( ( property_price - 5000000 ) / 500000 ) );
            cl1_2 = 51600 + ( intial * 2000 );
            bond_fee = cl1_2;
            transfer_fee = bond_fee;
        }

        /////////////////
        //Transfer Duty//
        /////////////////

        // Guideline: Using
        // https://www.sars.gov.za/Tax-Rates/Pages/Transfer-Duty.aspx
        /*
        * 2021 (1 March 2020 - 28 February 2021) -  See changes from last year

    ​Value of the property (R)​​	​Rate
    ​1 – 1000 000​	​0%
    1 000 001 – 1 375 000	​3% of the value above R1 000 000
    1 375 001 – 1 925 000	​R11 250 + 6% of the value above R 1 375 000
    1 925 001 – 2 475 000	​R44 250 + 8% of the value above R 1 925 000
    2 475 001 – 11 000 000	​R88 250 +11% of the value above R2 475 000
    ​11 000 001 and above	​R1 026 000 + 13% of the value exceeding R11 000 000

     * */
        // STEP 3: NOT DONE
        // 2020 Rates

        // NEW: Javascript Object to handle standard Table from SARS

        var transfer_duty_array = {
            'tier_start': {
                'lbound': 0,
                'ubound': 1000000,
                'base': 0,
                'percent': 0,
            },
            'tier_1': {
                'lbound': 1000000,
                'ubound': 1375000,
                'base': 0,
                'percent': 3,
            },
            'tier_2': {
                'lbound': 1375000,
                'ubound': 1925000,
                'base': 11250,
                'percent': 6,
            },
            'tier_3': {
                'lbound': 1925000,
                'ubound': 2475000,
                'base': 44250,
                'percent': 8,
            },
            'tier_4': {
                'lbound': 2475000,
                'ubound': 11000000,
                'base': 88250,
                'percent': 11,
            },
            'tier_end': {
                'lbound': 11000000,
                'ubound': 100000000,
                'base': 1026000,
                'percent': 13,
            }, /*Made this a very large upper bound just in case, not require based on logic*/
        };

        // NEW: Generate Logic from Array
        console.log( property_price );
        if ( property_price ) {
            for ( key in transfer_duty_array ) {
                console.log( key );
                for ( subkey in transfer_duty_array[ key ] ) {
                    console.log( 'subkey:' + transfer_duty_array[ key ][ subkey ] );
                    console.log( 'lbound:' + transfer_duty_array[ key ][ 'lbound' ] + 'ubound:' + transfer_duty_array[ key ][ 'ubound' ] );
                    if ( key == 'tier_start' && property_price <= transfer_duty_array[ key ][ 'ubound' ] ) {
                        transfer_duty = transfer_duty_array[ key ][ 'base' ];
                        console.log( 'If:1' );
                    } else if ( key == 'tier_end' && property_price > transfer_duty_array[ key ][ 'lbound' ] ) {
                        transfer_duty = transfer_duty_array[ key ][ 'base' ] + ( ( transfer_duty_array[ key ][ 'percent' ] * ( 1 / 100 ) * ( property_price - transfer_duty_array[ key ][ 'lbound' ] ) ) );
                        console.log( 'If:2' );
                    } else if ( property_price > transfer_duty_array[ key ][ 'lbound' ] && property_price <= transfer_duty_array[ key ][ 'ubound' ] ) {
                        transfer_duty = transfer_duty_array[ key ][ 'base' ] + ( ( transfer_duty_array[ key ][ 'percent' ] * ( 1 / 100 ) * ( property_price - transfer_duty_array[ key ][ 'lbound' ] ) ) );
                        console.log( 'If:3' );
                    }
                }
            }
        }
        console.log( 'Transfer Duty:' + transfer_duty );

        ////////////////
        //Deeds Office//
        ////////////////

        // Guideline: Taken from LexisDigest Deeds Office Fees, this year the
        // logic is split for Transfer and Bond. Seen Below. STEP 4: DONE 2020
        // Rates

        ///// TRANSFER SET
        if ( property_price <= 100000 ) {
            transfer_deeds_office_fee = 39;
        } else if ( property_price > 100000 && property_price <= 200000 ) {
            transfer_deeds_office_fee = 86;
        } else if ( property_price > 200000 && property_price <= 300000 ) {
            transfer_deeds_office_fee = 539;
        } else if ( property_price > 300000 && property_price <= 600000 ) {
            transfer_deeds_office_fee = 673;
        } else if ( property_price > 600000 && property_price <= 800000 ) {
            transfer_deeds_office_fee = 946;
        } else if ( property_price > 800000 && property_price <= 1000000 ) {
            transfer_deeds_office_fee = 1086;
        } else if ( property_price > 1000000 && property_price <= 2000000 ) {
            transfer_deeds_office_fee = 1220;
        } else if ( property_price > 2000000 && property_price <= 4000000 ) {
            transfer_deeds_office_fee = 1691;
        } else if ( property_price > 4000000 && property_price <= 6000000 ) {
            transfer_deeds_office_fee = 2051;
        } else if ( property_price > 6000000 && property_price <= 8000000 ) {
            transfer_deeds_office_fee = 2442;
        } else if ( property_price > 8000000 && property_price <= 10000000 ) {
            transfer_deeds_office_fee = 2854;
        } else if ( property_price > 10000000 && property_price <= 15000000 ) {
            transfer_deeds_office_fee = 3397;
        } else if ( property_price > 15000000 && property_price <= 20000000 ) {
            transfer_deeds_office_fee = 4080;
        } else if ( property_price > 20000000 ) {
            transfer_deeds_office_fee = 5435;
        }

        ///// BOND SET
        if ( property_price <= 150000 ) {
            bond_deeds_office_fee = 417;
        } else if ( property_price > 150000 && property_price <= 300000 ) {
            bond_deeds_office_fee = 539;
        } else if ( property_price > 300000 && property_price <= 600000 ) {
            bond_deeds_office_fee = 673;
        } else if ( property_price > 600000 && property_price <= 800000 ) {
            bond_deeds_office_fee = 946;
        } else if ( property_price > 800000 && property_price <= 1000000 ) {
            bond_deeds_office_fee = 1086;
        } else if ( property_price > 1000000 && property_price <= 2000000 ) {
            bond_deeds_office_fee = 1220;
        } else if ( property_price > 2000000 && property_price <= 4000000 ) {
            bond_deeds_office_fee = 1691;
        } else if ( property_price > 4000000 && property_price <= 6000000 ) {
            bond_deeds_office_fee = 2051;
        } else if ( property_price > 6000000 && property_price <= 8000000 ) {
            bond_deeds_office_fee = 2442;
        } else if ( property_price > 8000000 && property_price <= 10000000 ) {
            bond_deeds_office_fee = 2854;
        } else if ( property_price > 10000000 && property_price <= 15000000 ) {
            bond_deeds_office_fee = 3397;
        } else if ( property_price > 15000000 && property_price <= 20000000 ) {
            bond_deeds_office_fee = 4080;
        } else if ( property_price > 20000000 && property_price <= 30000000 ) {
            bond_deeds_office_fee = 4755;
        } else if ( property_price > 20000000 ) {
            bond_deeds_office_fee = 6794;
        }

        //2020 rates increase => NOT USED
        transfer_fee = transfer_fee * 1; // No increase as tables were changed
        bond_fee = bond_fee * 1; // No increase as tables were changed

        /////////////////
        //     VAT     //
        /////////////////

        // STEP 5: NOT DONE
        // Update to LAtest VAt tax rates, 15%

        var transfer_fee_tax = ( transfer_fee * 15 ) / 100;
        var bond_fee_tax = ( bond_fee * 15 ) / 100;

        var transfer_total = ( transfer_deeds_office_fee + transfer_duty + transfer_fee + transfer_fee_tax + pnp + additional_transfer_costs );
        var bond_total = ( bond_fee + bond_deeds_office_fee + bond_fee_tax + pnp + additional_bond_costs );

        var rez_array = new Array( transfer_fee, transfer_fee_tax, transfer_deeds_office_fee, transfer_duty, transfer_total, bond_fee, bond_fee_tax, bond_deeds_office_fee, bond_total, pnp, additional_bond_costs, additional_transfer_costs );

        //Set all numbers correctly
        /*    if(rez_array){ //exists
                if(rez_array.length > 0){ //has values
                    for (key in rez_array) {
                        console.log(key);
                        rez_array[key] = Number.parseFloat(rez_array[key]).toFixed(2);
                        console.log("array value:"+rez_array[key]);
                    }
                }
            }*/
        //Send off
        console.log( rez_array );
        return rez_array;

    }

    Number.prototype.toCurrency = function( $O ) { // extending Number prototype

        String.prototype.separate_thousands = function() { // Thousands separation
            $val = this;
            var rx = new RegExp( '(-?[0-9]+)([0-9]{3})' );
            while ( rx.test( $val ) ) { $val = $val.replace( rx, '$1' + $O.thousands_separator + '$2' ); }
            return $val;
        };

        Number.prototype.toFixed = function() { // Rounding
            var m = Math.pow( 10, $O.use_fractions.fractions );
            return Math.round( this * m, 0 ) / m;
            /*return this.toFixed($O.use_fractions.fractions);*/
        };

        String.prototype.times = function( by ) { // String multiplication
            by = ( by >> 0 );
            var t = ( by > 1 ? this.times( by / 2 ) : '' );
            return t + ( by % 2 ? t + this : t );
        };

        var $A = this;

        /* I like to keep all options, as the name would sugesst, **optional** :) so, let me make tham as such */
        $O ? null : $O = new Object;
        /* If no thousands_separator is present default to "," */
        $O.thousands_separator ? null : $O.thousands_separator = ',';
        /* If no currency_symbol is present default to "$" */
        $O.currency_symbol ? null : $O.currency_symbol = '$';

        // Fractions use is separated, just in case you don't want them
        if ( $O.use_fractions ) {
            $O.use_fractions.fractions ? null : $O.use_fractions.fractions = 2;
            $O.use_fractions.fraction_separator ? null : $O.use_fractions.fraction_separator = '.';
        } else {
            $O.use_fractions = new Object;
            $O.use_fractions.fractions = 0;
            $O.use_fractions.fraction_separator = ' ';
        }
        // We round this number
        $A.round = $A.toFixed();

        // We convert rounded Number to String and split it to integrer and
        // fractions
        $A.arr = ( $A.round + '' ).split( '.' );
        // First part is an integrer
        $A._int = $A.arr[ 0 ].separate_thousands();
        // Second part, if exists, are rounded decimals
        $A.arr[ 1 ] == undefined ? $A._dec = $O.use_fractions.fraction_separator + '0'.times( $O.use_fractions.fractions ) : $A._dec = $O.use_fractions.fraction_separator + $A.arr[ 1 ];

        /* If no symbol_position is present, default to "front" */
        $O.symbol_position ? null : $O.symbol_position = "front";
        $O.symbol_position == "front" ? $A.ret = $O.currency_symbol + $A._int + $A._dec : $A.ret = $A._int + $A._dec + " " + $O.currency_symbol;

        return $A.ret;
    }

}
