/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Component: Editable
* 
*/

(function( $ ) {

	'use strict';

	var EditableTable = {

		options: {
			addButton: '#addToTable',
			table: '#datatable-editable',
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm',
			},
			dialog2:{
				wrapper: '#myForm2',
				cancelButton: '#dialogCancel2',
				confirmButton: '#dialogConfirm2',
			},
			dialog3:{
				wrapper: '#myForm3',
				cancelButton: '#dialogCancel3',
				confirmButton: '#dialogConfirm3',
			}
		},

		initialize: function() {
			this
				.setVars()
				.build()
				.events();
		},

		setVars: function() {
			this.$table				= $( this.options.table );
			this.$addButton			= $( this.options.addButton );

			// dialog
			this.dialog				= {};
			this.dialog.$wrapper	= $( this.options.dialog.wrapper );
			this.dialog.$cancel		= $( this.options.dialog.cancelButton );
			this.dialog.$confirm	= $( this.options.dialog.confirmButton );
			this.dialog2			= {};
			this.dialog2.$wrapper	= $( this.options.dialog2.wrapper );
			this.dialog2.$cancel	= $( this.options.dialog2.cancelButton );
			this.dialog2.$confirm	= $( this.options.dialog2.confirmButton );
			this.dialog3			= {};
			this.dialog3.$wrapper	= $( this.options.dialog3.wrapper );
			this.dialog3.$cancel	= $( this.options.dialog3.cancelButton );
			this.dialog3.$confirm	= $( this.options.dialog3.confirmButton );
			return this;
		},

		build: function() {
			this.datatable = this.$table.DataTable({
				/*aoColumns: [
					null,
					null,
					null,
					{ "bSortable": false }
				]*/
				"ajax": {
               "url": "http://127.0.0.1/mission8/selectmysql2.php",
               "type": "post",
			   "data":{"type":2},
               "error":function(){alert("服务器未正常响应，请重试");}
          		 },
				"columns": [
               { "data": "id", "title":"序号","defaultContent":""},
               { "data": "newsTitle", "title":"新闻题目","defaultContent":""},
               { "data": "newsImg", "title":"新闻图片","defaultContent":""},
               { "data": "newsContent", "title":"新闻内容","defaultContent":""},
               { "data": null, "title":"操作","class":"actions","defaultContent":
				 "<a href='#' class='hidden on-editing save-row'><i class='fa fa-save'></i></a>"+
				 "<a href='#' class='hidden on-editing cancel-row'><i class='fa fa-times'></i></a>"+
				 "<a href='#' class='on-default edit-row'><i class='fa fa-pencil'></i></a>"+
				 "<a href='#' class='on-default remove-row'><i class='fa fa-trash-o'></i></a>"
               }
           		],
				
			});

			window.dt = this.datatable;

			return this;
		},

		events: function() {
			var _self = this;

			this.$table
				.on('click', 'a.save-row', function( e ) {
					e.preventDefault();
					_self.rowSave( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.cancel-row', function( e ) {
					e.preventDefault();
					_self.rowCancel( $(this).closest( 'tr' ) );
				})
				.on('click', 'a.edit-row', function( e ) {
					e.preventDefault();
					var $row=$(this).closest( 'tr' ).get(0);
					var id=$row.firstChild.innerHTML;
					var newsTitle=$row.children[1].innerHTML;
					var newsImg=$row.children[2].innerHTML;
					var newsContent=$row.children[3].innerHTML;
					$("#editId").val(id);
					$("#newsTitle").val(newsTitle);
					$("#newsContent").val(newsContent);
					$.magnificPopup.open({
						items: {
							src: _self.options.dialog3.wrapper,
							type: 'inline'
						},
						preloader: false,
						modal: true,
						callbacks: {
							change: function() {
								_self.dialog3.$confirm.on( 'click', function( e ) {
									e.preventDefault();
									$.magnificPopup.close();
								});
							},
							close: function() {
								_self.dialog3.$confirm.off( 'click' );
							}
						}
					});
				})
				.on( 'click', 'a.remove-row', function( e ) {
					e.preventDefault();

					var $row = $(this).closest( 'tr' );

					$.magnificPopup.open({
						items: {
							src: _self.options.dialog.wrapper,
							type: 'inline'
						},
						preloader: false,
						modal: true,
						callbacks: {
							change: function() {
								_self.dialog.$confirm.on( 'click', function( e ) {
									e.preventDefault();
									_self.rowRemove( $row );
									$.magnificPopup.close();
								});
							},
							close: function() {
								_self.dialog.$confirm.off( 'click' );
							}
						}
					});
				});

			this.$addButton.on( 'click', function(e) {
				e.preventDefault();
				$.magnificPopup.open({
						items: {
							src: _self.options.dialog2.wrapper,
							type: 'inline'
						},
						preloader: false,
						modal: true,
						callbacks: {
							change: function() {
								_self.dialog2.$confirm.on( 'click', function( e ) {
									e.preventDefault();
									$.magnificPopup.close();
								});
							},
							close: function() {
								_self.dialog2.$confirm.off( 'click' );
							}
						}
					});
			});

			this.dialog.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});
			this.dialog2.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});
			this.dialog3.$cancel.on( 'click', function( e ) {
				e.preventDefault();
				$.magnificPopup.close();
			});
			return this;
		},

		// ==========================================================================================
		// ROW FUNCTIONS
		// ==========================================================================================
		

		rowCancel: function( $row ) {
			var _self = this,
				$actions,
				i,
				data;

			if ( $row.hasClass('adding') ) {
				this.rowRemove( $row );
			} else {

				data = this.datatable.row( $row.get(0) ).data();
				this.datatable.row( $row.get(0) ).data( data );

				$actions = $row.find('td.actions');
				if ( $actions.get(0) ) {
					this.rowSetActionsDefault( $row );
				}
				this.datatable.draw();
			}
		},

		rowEdit: function( $row ) {
			var _self = this,
				data;
			data = this.datatable.row( $row.get(0) ).data();
			$row.children( 'td' ).each(function( i ) {
					var $this = $( this );
					if(i!=0)
					{
							if ( $this.hasClass('actions') ) {
								_self.rowSetActionsEditing( $row );
							} else {
								$this.html( '<input type="text" class="form-control input-block" value="' + data[i] + '"/>' );
							}
					}
			});
		},

		rowSave: function( $row ) {
			var _self     = this,
				$actions,
				values    = [];
			var tds=$row.children();
			
			$.each(tds,function(i,val){
				var jqob=$(val);
				if(!i<1||jqob.hasClass('actions'))
				{
					var txt=jqob.children("input").val();
					jqob.html(txt);
					_self.datatable.cell( jqob ).data(txt);
				}
			});
			var datas = this.datatable.row( $row.get(0) ).data();
			var data={};
			data.id=datas.id;
			data.newsTitle=datas.newsTitle;
			data.newsImg=datas.newsImg;
			data.newsContent=datas.newsContent;
			data.type=1;
			if ( $row.hasClass( 'adding' ) ) {
				this.$addButton.removeAttr( 'disabled' );
				$row.removeClass( 'adding' );
				$.ajax({
					type:"get",
					data:data,
					url:"http://127.0.0.1/mission8/insertmysql.php",
					success:function(result){
			   			if(result.errorCode="111111")
			   			{
			   			}
			   		},
					error:function(XMLResponse){
						console.log(XMLResponse.responseText);
					}
				});
			}
			else
			{
				$.ajax({
					type:"get",
					data:data,
					url:"http://127.0.0.1/mission8/updatemysql.php",
					success:function(){
			   			location.reload();
			   		},
					error:function(XMLResponse){
						console.log(XMLResponse.responseText);
					}
				});
			}
			
			$actions = $row.find('td.actions');
			if ( $actions.get(0) ) {
				this.rowSetActionsDefault( $row );
			}
			this.datatable.draw();
		},
		
		rowRemove: function( $row ) {
			var _self = this,
				data;
			data = this.datatable.row( $row.get(0) ).data();
			if ( $row.hasClass('adding') ) {
				this.$addButton.removeAttr( 'disabled' );
			}
			this.datatable.row( $row.get(0) ).remove().draw();
			$.ajax({
               "url": "http://127.0.0.1/mission8/deletemysql.php",
			   "data":{"id":data.id,"type":1},
               "type": "post",
			   "success":function(data){
			   		location.reload();
			   }
          	});
		},

		rowSetActionsEditing: function( $row ) {
			$row.find( '.on-editing' ).removeClass( 'hidden' );
			$row.find( '.on-default' ).addClass( 'hidden' );
		},

		rowSetActionsDefault: function( $row ) {
			$row.find( '.on-editing' ).addClass( 'hidden' );
			$row.find( '.on-default' ).removeClass( 'hidden' );
		}

	};

	$(function() {
		EditableTable.initialize();
	});

}).apply( this, [ jQuery ]);