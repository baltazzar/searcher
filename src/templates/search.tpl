<div class="row">
	<div class="col-md-2">
		<select class="form-control input-sm search-attrs">
		{{#each searchAttrs}}
			<option value="{{ attr }}">Buscar por {{ title }}</option>
		{{/each}}
		</select>
	</div>
	<div class="col-md-4">
		<form class="form-search" action="">
			<div class="input-group">
				<input type="text" class="form-control input-sm search-param" placeholder="Digite sua busca">
				<span class="input-group-btn">
					<button class="btn btn-sm btn-primary btn-search"><i class="glyphicon glyphicon-search"></i></button>
				</span>
			</div>
		</form>
	</div>
</div>