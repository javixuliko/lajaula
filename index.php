<?php
    session_start();
    $page = $_GET['page'] ?? 'homepage';

    if ($page === 'homepage') {
        include("view/inc/top_page_home.html");
    } elseif ($page === 'shop') {
        include("view/inc/top_page_shop.html");
    } else {
        include("view/inc/top_page.html");
    }
?>
<div id="wrapper">		
    <div id="header">    	
        <?php include("view/inc/header.html"); ?>        
    </div>  
    <div id="">
        <?php include("view/inc/pages.php"); ?>        
        <br style="clear:both;" />
    </div>
    <div id="footer">   	   
        <?php include("view/inc/footer.html"); ?>        
    </div>
</div>
<?php include("view/inc/bottom_page.html"); ?>